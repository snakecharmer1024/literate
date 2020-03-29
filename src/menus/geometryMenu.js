import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Tetrahedron from '../geometry/tetrahedron.js'
import IcosahedronDodecahedron from '../geometry/icosahedron-dodecahedron.js'
import OctahedronCube from '../geometry/octahedron-cube.js'
import PValues from '../geometry/pvalues.js';
import Stars from '../geometry/stars.js';
import Flower from '../geometry/flower.js';
import Quaternions from '../geometry/quaternion.js';
import {Menu} from 'evergreen-ui'


export default class GeometryMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      children: []
    };
  }

  geometries = [
    'Tetrahedron Fractal', 'Octahedron Cube Fractal', 'Icosahedron Dodecahedron Fractal', 'P Values',
    'Stars', 'Flower', 'Quaternions'
  ]

  render() {
    return (
      <div className="App">

        <p className="App-intro">
          Geometry
        </p>
        <Menu><Menu.Group>
          {this.geometries.map(x => (
            <Menu.Item
              key={x}
              onSelect={() => this.props.history.push('/geometry/' + x.replace(/\s/g, "-"))}>
              {x}
            </Menu.Item>
          ))}
        </Menu.Group></Menu>

        <Switch>
          <Route component={Tetrahedron} path={"/geometry/tetrahedron-fractal"} />
          <Route component={OctahedronCube} path={"/geometry/octahedron-cube-fractal"} />
          <Route component={IcosahedronDodecahedron} path={"/geometry/icosahedron-dodecahedron-fractal"} />
          <Route component={PValues} path={"/geometry/p-values"} />
          <Route component={Stars} path={"/geometry/stars"} />
          <Route component={Stars} path={"/geometry/stars/:vertices/:stepSize"} />
          <Route component={Flower} path={"/geometry/flower"} />
          <Route component={Quaternions} path={"/geometry/Quaternions"} />
        </Switch>
      </div>

    )
  }
}
