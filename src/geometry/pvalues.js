import React, { Component } from 'react';
import { Range } from 'rc-slider';
import {select} from 'd3';
import 'rc-slider/assets/index.css';

var highThreshCnt = -1;
var width = 640;
var height = 480;
var rad = width / 250;
var nodes = [];

function highThreshDist() {
    highThreshCnt++;
    var offset = 0;
    var colWidth = width / 10;
    var rowWidth = colWidth * Math.sqrt(3) / 2;

    var row = (Math.floor(highThreshCnt / 10));
    var col = (highThreshCnt % 10);
    if (row % 2 === 1) {
        offset = colWidth / 2;
    } else {
        offset = 0;
    }
    return {
        x: offset + (col * colWidth) ,
        y: row * rowWidth
    }
}

function lowFreqDist() {
    return {
        x: rad + (Math.random() * width),
        y: rad + (Math.random() * height)
    }
}

function linkDistSq(source, target) {
    return (nodes[source].x - nodes[target].x) ** 2 +
      (nodes[source].y - nodes[target].y) ** 2
}



function init(that) {
    var i, j;

    var numHighThreshNodes = 100;
    var numLowThreshNodes = 200;
    for (i = 0; i < numHighThreshNodes; i++) {
        nodes.push(highThreshDist());
    }
    for (i = 0; i < numLowThreshNodes; i++) {
        nodes.push(lowFreqDist());
    }

    var links = [];
    for (i = 0; i < nodes.length; i++) {
      for (j = i + 1; j < nodes.length; j++) {
        links.push({
            source: i,
            target: j,
            dist: linkDistSq(i, j)
        })
      }
    }

    links.sort((a,b) => {
        if (a.dist > b.dist) return 1;
        if (a.dist < b.dist) return -1;
        return 0;
    });

    var svg = select('#graph').append('svg')
        .attr('width', width)
        .attr('height', height);


    svg.selectAll('nodes')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'node')
        .attr('r', rad)
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y);


    that.link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link')
        .attr('x1', function(d) { return nodes[d.source].x; })
        .attr('y1', function(d) { return nodes[d.source].y; })
        .attr('x2', function(d) { return nodes[d.target].x; })
        .attr('y2', function(d) { return nodes[d.target].y; })
        .attr('visibility', 'hidden');

}

// function appendScript(src, integrity) {
//     const s = document.createElement('script');
//     s.type = 'text/javascript';
//     s.async = false;
//     s.src = src;
//     if (integrity.length > 0) s.integrity = integrity;
//     s.crossOrigin= 'anonymous';
//     return s;
// }

let pvalues = null;

export default class PValues extends Component {
    sliderDefaults = [0, 15];
    filterLinks(values) {
        let [mn, mx] = values;
        pvalues.link.style('visibility', (d) => {
            return pvalues.filterHash[
                d.dist < mn * pvalues.sliderAmplitude ||
                d.dist > mx * pvalues.sliderAmplitude
            ];})
    }
    componentDidMount() {
        pvalues = this;
        init(this);
        this.filterLinks(this.sliderDefaults);
    }
    sliderAmplitude = 80;
    filterHash = {
        true: 'hidden',
        false: 'visible'
    }
    render () {
        return (
            <div>
                <h2> Changing the Channel </h2>
                <div id="graph_container">
                    <div id="graph"></div>
                    <br/>
                    <Range
                        className={"range"}
                        defaultValue={[0, 15]}
                        min={0}
                        max={100}
                        allowCross={false}
                        onChange={this.filterLinks}
                    />
                    <div id="slider-desc">Neural Threshold</div>
                </div>
            </div>
        )
    }

}

