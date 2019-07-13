import React, { Component } from 'react';
import { Route } from 'react-router';
import Tetrahedron from '../geometry/tetrahedron.js'
import IcosahedronDodecahedron from '../geometry/icosahedron-dodecahedron.js'
import OctahedronCube from '../geometry/octahedron-cube.js'
import PValues from '../geometry/pvalues.js'
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';


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
      <PValues />
  ];

  handleChange = (event, index, value) => {
    var state = {
      value: value,
      children: this.components[index]
    };
    this.setState(state);
  };

  render() {
    return (
      <div className="App">

        <p className="App-intro">
          Geometry <br/>
        </p>

        <DropdownMenu triggerType="text" trigger={"What would you like to see?"}>
          <MenuItem text="Tetrahedron Fractal" location="/geometry/tetrahedron-fractal" />
          <MenuItem text="Octahedron-Cube Fractal" location="/geometry/octahedron-cube-fractal" />
          <MenuItem text="Icosahedron-Dodecahedron Fractal" location="/geometry/icosahedron-dodecahedron-fractal" />
          <MenuItem text="P-Values" location="/geometry/p-values" />
        </DropdownMenu>
        <Route component={Tetrahedron} path={"/geometry/tetrahedron-fractal"} />
        <Route component={OctahedronCube} path={"/geometry/octahedron-cube-fractal"} />
        <Route component={IcosahedronDodecahedron} path={"/geometry/icosahedron-dodecahedron-fractal"} />
        <Route component={PValues} path={"/geometry/p-values"} />

        <div id='geometry'>
          { this.state.children }
        </div>
      </div>

    )
  }
}
