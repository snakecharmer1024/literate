import React, { Component } from 'react';
import {select} from 'd3';
import Slider from "rc-slider";
import {goldenRatioColor, crystalSpiralColor} from '../colors';

function buildRing(rad, center, numRings=12, offset=0, color='black') {
  let nodes = [
    {
      x:center.x,
      y:center.y,
      r: rad * 2,
      color: color
    }
  ];
  let angle;
  for (var i = 0; i < numRings; i ++) {
    angle = 2 * Math.PI * i / numRings;
    nodes.push({
      x: center.x + rad * Math.cos(angle + offset),
      y: center.y + rad * Math.sin(angle + offset),
      r: rad,
      color: color,
    });
  }
  return nodes;
}

function drawFlower(self, layers=self.state.layers) {
    var width = 1240;
    var height = 880;
    let numRings = 12;
    let numColors = layers;
    let colors = [];
    for (let i = 0; i < numColors; i ++) {
      colors.push(crystalSpiralColor());
    }
    let center = { x: width / 2, y: height / 2};
    let nodes = [
      {
        x: center.x,
        y: center.y,
        r: self.state.radius,
        color: colors[0]
      }
    ];
    for (var i = 0; i < layers; i++) {
//      offset = i % 2 ? Math.PI / 6 : 0;
      nodes = nodes.concat(buildRing(self.state.radius * (2 ** i), center, numRings, 0, colors[i]));
    }

    if (self.svg) self.svg.remove();

    self.svg = select('#graph').append('svg')
        .attr('width', width)
        .attr('height', height);

    self.svg.selectAll('nodes')
        .data(nodes)
        .enter()
        .append('circle')
        .style('stroke', d => d.color)
        .attr('class', 'flower')
        .attr('r', d => d.r)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
}


export default class Flower extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layers: 2,
      radius: 50,
    }
  }

  componentDidMount() {
    drawFlower(this,2);
  }
  render () {
    return (
      <div id="graph-container">
        <div id="graph"></div>
        <div className="full-slider-div">
          Layers
          <Slider
            className={"range"}
            defaultValue={this.state.layers}
            min={1}
            max={10}
            onChange={(value) => {
              this.setState({layers: value});
              drawFlower(this, value);
            }}
          /></div>
        <div className="full-slider-div">
          Radius
          <Slider
            className={"range"}
            defaultValue={this.state.radius}
            min={5}
            max={200}
            onChange={(value) => {
              this.setState({radius: value});
              drawFlower(this);
            }}
          /></div>
      </div>
    );
  }
}