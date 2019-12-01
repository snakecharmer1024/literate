import React, { Component } from 'react';
import {Pane, Text, Button, majorScale, Table} from 'evergreen-ui'
import Slider from "rc-slider";
import {select} from 'd3';

function drawEdges(self) {
  let numColors = gcd(self.state.stepSize, self.state.numVertices);
  let colors = [];
  for (let i = 0; i < numColors; i ++) {
    colors.push(goldenRatioColor());
  }

  self.svg.selectAll('.link').remove();

  let edges = [];
  for (let i = 0; i < self.state.numVertices; i++) {
    edges.push({
      source: i,
      target: (i + self.state.stepSize) % self.state.numVertices,
      color: colors[i % numColors]
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

function hsv_to_rgb(h, s, v) {
  const h_i = Math.floor(h * 6);
  const f = h * 6 - h_i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r,g,b;
  if (h_i === 0)
    [r, g, b] = [v, t, p];
  if (h_i === 1)
    [r, g, b] = [q, v, p];
  if (h_i === 2)
    [r, g, b] = [p, v, t];
  if (h_i === 3)
    [r, g, b] = [p, q, v];
  if (h_i === 4)
    [r, g, b] = [t, p, v];
  if (h_i === 5)
    [r, g, b] = [v, p, q];
  return [Math.floor(r * 256), Math.floor(g * 256), Math.floor(b * 256)]
}

function rgbToHex(rgb) {
  return '#' + rgb.map(x => x.toString(16).padStart(2, '0')).reduce((a,b) => a + b);
}

const golden_ratio_conjugate = 0.618033988749895;

function goldenRatioColor() {
  const h = (Math.random() + golden_ratio_conjugate) % 1;
  return rgbToHex(hsv_to_rgb(h, 0.5, 0.95));
}

export default class Stars extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 0,
        numColors: 0,
        numVertices: 120,
        stepSize: 1,
        radius: 200,
        children: [],
        buttonTexts: ['Pause', 'Start'],
        buttonTextIndex: 0,
        delay: 500
      };
    }

    componentDidMount() {
      this.drawVertices(this.state.numVertices);
      drawEdges(this);
      this.animation = this.animate()
      // setInterval(() => changeColor(that), 1000);
    }

    animate() {
      let that = this;
      return setInterval(() => {
        this.setState((state, props) => ({'stepSize': (state.stepSize + 1) % state.numVertices}));
        drawEdges(that);
      }, this.state.delay);
    }

    drawVertices(numVertices) {

      if (this.svg) this.svg.remove();

      var i;
      let width = 640;
      let height = 640;
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

          <Pane
            height={1080}
            width={'90%'}
            padding={"20px"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            // border="default"
          >
            <Table>
              <Table.Body height={480} width={240}>
                <Table.Row key={'polygons'} isSelectable={false}>
                    <Table.TextCell>Polygons</Table.TextCell>
                    <Table.TextCell>{this.state.numColors}</Table.TextCell>
                </Table.Row>
                <Table.Row key={'shapes'} isSelectable={false}>
                    <Table.TextCell>Shapes</Table.TextCell>
                    <Table.TextCell>{this.state.numVertices / this.state.numColors}-gon</Table.TextCell>
                </Table.Row>
                <Table.Row key={'vertices'} isSelectable={false}>
                    <Table.TextCell>Vertices</Table.TextCell>
                    <Table.TextCell>{this.state.numVertices}</Table.TextCell>
                </Table.Row>
                <Table.Row key={'stepSize'} isSelectable={false}>
                    <Table.TextCell>Step Size</Table.TextCell>
                    <Table.TextCell>{this.state.stepSize}</Table.TextCell>
                </Table.Row>
                <Table.Row key={'delay'} isSelectable={false}>
                    <Table.TextCell>Delay</Table.TextCell>
                    <Table.TextCell>{this.state.delay} ms</Table.TextCell>
                </Table.Row>

              </Table.Body>
            </Table>
              <Button
                width={64}
                marginLeft={10}
                appearance="primary"
                onClick={() => {
                  this.state.buttonTextIndex === 0 ? clearTimeout(this.animation) : this.animation = this.animate();
                  this.setState((state, props) => ({'buttonTextIndex': (state.buttonTextIndex + 1) % 2 }))
                }}
              >
                {this.state.buttonTexts[this.state.buttonTextIndex]}
              </Button>
              <Pane>
                <div id="graph_container">
                    <div id="graph"></div>
                    <br/>
                    Vertices
                    <Slider
                        className={"range"}
                        defaultValue={this.state.numVertices}
                        min={3}
                        max={256}
                        onChange={(value) => {
                          clearTimeout(this.animation);
                          this.drawVertices(value);
                          this.animation = this.animate();
                        }}
                    />
                    Delay
                    <Slider
                        className={"range"}
                        defaultValue={this.state.delay}
                        min={1}
                        max={4000}
                        onChange={(value) => {
                          clearTimeout(this.animation);
                          this.setState({'delay': value})
                          this.animation = this.animate();
                        }}
                    />
                    Radius
                    <Slider
                        className={"range"}
                        defaultValue={this.state.radius}
                        min={64}
                        max={300}
                        onChange={(value) => {
                          clearTimeout(this.animation);
                          this.setState({'radius': value});
                          this.drawVertices(this.state.numVertices);
                          this.animation = this.animate();
                        }}
                    />

                </div>
              </Pane>
          </Pane>
      )
    }

}
