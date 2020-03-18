import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Tetrahedron from '../geometry/tetrahedron.js'
import IcosahedronDodecahedron from '../geometry/icosahedron-dodecahedron.js'
import OctahedronCube from '../geometry/octahedron-cube.js'
import PValues from '../geometry/pvalues.js';
import Stars from '../geometry/stars.js';
import Flower from '../geometry/flower.js';
import {Autocomplete, TextInput} from 'evergreen-ui'


export default class GeometryMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      children: []
    };
  }

  components = [
      [],
      <Tetrahedron />,
      <OctahedronCube />,
      <IcosahedronDodecahedron />,
      <PValues />,
      <Stars />,
      <Flower />
  ];

  handleChange = (event, index, value) => {
    var state = {
      value: value,
      children: this.components[index]
    };
    this.setState(state);
  };

  geometries = [
    'Tetrahedron Fractal', 'Octahedron Cube Fractal', 'Icosahedron Dodecahedron Fractal', 'P Values',
    'Stars', 'Flower'
  ]

  render() {
    return (
      <div className="App">

        <p className="App-intro">
          Geometry
        </p>

        <Autocomplete
          title="Geometry"
          onChange={changedItem => this.props.history.push('/geometry/' + changedItem.replace(/\s/g, "-"))}
          items={this.geometries}
        >
          {(props) => {
            const { getInputProps, getRef, inputValue, openMenu } = props
            return (
              <TextInput
                placeholder="geometry"
                value={inputValue}
                innerRef={getRef}
                {...getInputProps({
                  onFocus: () => {
                    openMenu()
                  }
                })}
              />
            )
          }}
        </Autocomplete>
        <Switch>
          <Route component={Tetrahedron} path={"/geometry/tetrahedron-fractal"} />
          <Route component={OctahedronCube} path={"/geometry/octahedron-cube-fractal"} />
          <Route component={IcosahedronDodecahedron} path={"/geometry/icosahedron-dodecahedron-fractal"} />
          <Route component={PValues} path={"/geometry/p-values"} />
          <Route component={Stars} path={"/geometry/stars"} />
          <Route component={Stars} path={"/geometry/stars/:vertices/:stepSize"} />
          <Route component={Flower} path={"/geometry/flower"} />
        </Switch>
      </div>

    )
  }
}
