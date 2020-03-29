import React, { Component } from 'react';
import {select} from 'd3';
import Slider from "rc-slider";
import {goldenRatioColor, crystalSpiralColor} from '../colors';
import { Checkbox, Table } from 'evergreen-ui';


function buildRing(rad, center, circles=12, offset=0, color='black') {
  let nodes = [
    {
      x:center.x,
      y:center.y,
      r: rad * 2,
      color: color
    }
  ];
  let angle;
  for (var i = 0; i < circles; i ++) {
    angle = 2 * Math.PI * i / circles;
    nodes.push({
      x: center.x + rad * Math.cos(angle + offset),
      y: center.y + rad * Math.sin(angle + offset),
      r: rad,
      color: color,
    });
  }
  return nodes;
}



export default class Flower extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layers: 2,
      circles: 6,
      radius: 50,
      phaseShift: false
    }
  }

  componentDidMount() {
    this.drawFlower(2);
  }

  drawFlower(layers=this.state.layers, circles=this.state.circles, phaseShift=this.state.phaseShift) {
    var width = window.screen.width;
    var height = window.screen.height / 2;
    let numColors = layers;
    let colors = [], offset = 0;
    for (let i = 0; i < numColors; i ++) {
      colors.push(crystalSpiralColor());
    }
    let center = { x: width / 2, y: height / 2};
    let nodes = [
      {
        x: center.x,
        y: center.y,
        r: this.state.radius,
        color: colors[0]
      }
    ];

    for (var i = 0; i < layers; i++) {
      offset = i % 2 && phaseShift ? Math.PI / circles : 0;
      nodes = nodes.concat(buildRing(this.state.radius * (2 ** i), center, circles, offset, colors[i]));
    }

    if (this.svg) this.svg.remove();

    this.svg = select('#graph').append('svg')
        .attr('width', width)
        .attr('height', height);

    this.svg.selectAll('nodes')
        .data(nodes)
        .enter()
        .append('circle')
        .style('stroke', d => d.color)
        .attr('class', 'flower')
        .attr('r', d => d.r)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
}

  render () {
    return (
      <div id="graph-container">
        <div id="graph"></div>
        <div className="table-slider">
          <Table>
            <Table.Body width={'20%'} float={'left'} display={'block'} marginBottom={40}>
              <Table.Row key={'layers'} isSelectable={false}>
                  <Table.TextCell>Layers</Table.TextCell>
                  <Table.TextCell>{this.state.layers}</Table.TextCell>
              </Table.Row>
              <Table.Row key={'circles'} isSelectable={false}>
                  <Table.TextCell>Circles</Table.TextCell>
                  <Table.TextCell>{this.state.circles}</Table.TextCell>
              </Table.Row>
              <Table.Row key={'radius'} isSelectable={false}>
                  <Table.TextCell>Radius</Table.TextCell>
                  <Table.TextCell>{this.state.radius}</Table.TextCell>
              </Table.Row>
              <Table.Row key={'phaseShift'} isSelectable={false}>
                  <Table.TextCell>Phase Shift</Table.TextCell>
                  <Table.TextCell>{this.state.phaseShift ? "TRUE" : "FALSE"}</Table.TextCell>
              </Table.Row>
            </Table.Body>
          </Table>
          </div>

        <div className="slider-div">
          Layers
          <Slider
            className={"range"}
            defaultValue={this.state.layers}
            min={1}
            max={10}
            onChange={(value) => {
              this.setState({layers: value});
              this.drawFlower(value);
            }}
          /></div>
        <div className="slider-div">
          Circles
          <Slider
            className={"range"}
            defaultValue={this.state.circles}
            min={2}
            max={24}
            onChange={(value) => {
              this.setState({circles: value});
              this.drawFlower(this.state.layers, value);
            }}
          /></div>
        <div className="slider-div">
          Radius
          <Slider
            className={"range"}
            defaultValue={this.state.radius}
            min={5}
            max={200}
            onChange={(value) => {
              this.setState({radius: value});
              this.drawFlower();
            }}
          /></div>
          <Checkbox
            label="Phase Shift"
            checked={this.state.phaseShift}
            onChange={ e => {
              this.setState({ phaseShift: e.target.checked })
              this.drawFlower();
            }}
          />

      </div>
    );
  }
}