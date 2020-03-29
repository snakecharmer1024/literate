import React, { Component } from 'react';
import {Pane, Text, Button, majorScale, Table} from 'evergreen-ui'
import Slider from "rc-slider";
import {select} from 'd3';
import {goldenRatioColor, crystalSpiralColor} from '../colors';

function drawEdges(self) {
  let numColors = gcd(self.state.stepSize, self.state.numVertices);
  let colors = [];
  for (let i = 0; i < numColors; i ++) {
    colors.push(crystalSpiralColor());
  }

  self.svg.selectAll('.link').remove();

  let edges = [];
  for (let i = 0; i < self.state.numVertices; i++) {
    edges.push({
      source: i,
      target: (i + self.state.stepSize) % self.state.numVertices,
      color: colors[i % numColors],
      zIndex: -i
    });
  }
  self.edges = edges;
  self.svg.selectAll('.link')
    .data(edges)
    .enter().append('line')
    .attr('class', 'link')
    .style('stroke', d => d.color)
    .attr('x1', function(d) { return self.nodes[d.source].x; })
    .attr('y1', function(d) { return self.nodes[d.source].y; })
    .attr('x2', function(d) { return self.nodes[d.target].x; })
    .attr('y2', function(d) { return self.nodes[d.target].y; })
    .attr('z', d => d.z);
  self.setState({'numColors': numColors});
}

function gcd(x, y) {
  if ((typeof x !== 'number') || (typeof y !== 'number'))
    return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function changeColor(self) {
  let newcolor = goldenRatioColor();
  self.svg.selectAll('.link')
    .transition()
    .style('stroke', newcolor)
}

export default class Stars extends Component {
    constructor(props) {
      super(props);
      const params = props.match.params;
      this.state = {
        value: 0,
        animating: false,
        numColors: 0,
        numVertices: params.vertices ? params.vertices : 120,
        stepSize: params.stepSize ? params.stepSize : 1,
        radius: 200,
        children: [],
        buttonTexts: ['Pause', 'Start'],
        buttonTextIndex: 1,
        delay: 500
      };
      console.log('state', this.state)
    }


    componentDidMount() {
      this.drawVertices(this.state.numVertices);
      drawEdges(this);
//      this.animation = this.animate()
    }

    animate() {
      let that = this;
      return setInterval(() => {
        this.setState((state, props) => ({'stepSize': (state.stepSize + 1) % state.numVertices}));
        drawEdges(that);
      }, this.state.delay);
    }

    toggleAnimation() {
      if (this.animation) {
        clearTimeout(this.animation);
        this.animation = null;
      } else {
        this.animation = this.animate();
      }
    }

    drawVertices(numVertices) {

      if (this.svg) this.svg.remove();

      var i;
      var width = window.innerWidth;
      var height = window.innerHeight / 2;
      let rad = width / 250;
      let origin = {
        x: width / 2,
        y: height / 2
      };
      let nodes = [];
      let angle;
      for (i = 0; i < numVertices; i++) {
        angle = Math.PI * 2 * i / numVertices;
          nodes.push({
            x: origin.x + (this.state.radius * Math.cos(angle)),
            y: origin.y + (this.state.radius * Math.sin(angle))
          });
      }

      this.svg = select('#graph').append('svg')
          .attr('width', width)
          .attr('height', height);

      this.svg.selectAll('nodes')
          .data(nodes)
          .enter().append('circle')
          .attr('class', 'node')
          .attr('r', rad)
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y);

      this.nodes = nodes;
      this.setState({'numVertices': numVertices});
    }

    render () {
      return (
        <div>
              <Pane>
                <div id="graph_container">
                    <div id="graph"></div>
                    <Button
                      width={64}
                      margin={20}
                      appearance="primary"
                      onClick={() => {
                        this.setState((state, props) => ({'buttonTextIndex': (state.buttonTextIndex + 1) % 2 }))
                        this.toggleAnimation();
                      }}
                    >
                      {this.state.buttonTexts[this.state.buttonTextIndex]}
                    </Button>
                    <div className="table-slider">
                      <Table>
                        <Table.Body width={'20%'} float={'left'} display={'block'} marginBottom={40}>
                          <Table.Row key={'polygons'} isSelectable={false}>
                              <Table.TextCell>Stars</Table.TextCell>
                              <Table.TextCell>{this.state.numColors}</Table.TextCell>
                          </Table.Row>
                          <Table.Row key={'shapes'} isSelectable={false}>
                              <Table.TextCell>Sides</Table.TextCell>
                              <Table.TextCell>{this.state.numVertices / this.state.numColors}-gon</Table.TextCell>
                          </Table.Row>
                          <Table.Row key={'vertices'} isSelectable={false}>
                              <Table.TextCell>Vertices</Table.TextCell>
                              <Table.TextCell>{this.state.numVertices}</Table.TextCell>
                          </Table.Row>
                          <Table.Row key={'stepSize'} isSelectable={false}>
                              <Table.TextCell>Steps</Table.TextCell>
                              <Table.TextCell>{this.state.stepSize}</Table.TextCell>
                          </Table.Row>
                          <Table.Row key={'delay'} isSelectable={false}>
                              <Table.TextCell>Delay</Table.TextCell>
                              <Table.TextCell>{this.state.delay} ms</Table.TextCell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                      </div>
                      <div className="slider-div">
                      Vertices
                      <Slider
                          className={"range"}
                          defaultValue={this.state.numVertices}
                          min={3}
                          max={256}
                          onChange={(value) => {
                            this.drawVertices(value);
                          }}
                      /></div>
                      <div className="slider-div">
                      Delay
                      <Slider
                          className={"range"}
                          defaultValue={this.state.delay}
                          min={1}
                          max={4000}
                          onChange={(value) => {
                            this.setState({'delay': value})
                            this.toggleAnimation()
                            this.toggleAnimation()
                          }}
                      /></div>
                      <div className="slider-div">
                      Radius
                      <Slider
                          className={"range"}
                          defaultValue={this.state.radius}
                          min={64}
                          max={300}
                          onChange={(value) => {
                            this.setState({'radius': value});
                            this.drawVertices(this.state.numVertices);
                          }}
                      /></div>
                  </div>
              </Pane>
              </div>
      )
    }

}
