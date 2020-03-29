import React, { Component } from 'react';
import {Pane, Text, Button, majorScale, Table} from 'evergreen-ui'
import Slider from "rc-slider";

var THREE = require('three');
var camera, scene, renderer;
var material, meshes;
var light, geometries, num_geos, radius, rotation_speed, new_geo
let rotationQuaternion = new THREE.Quaternion();
let lastRotation = new THREE.Quaternion();
let precision = 100;

var icosa = init();
animate();


function init() {
    //camera = new THREE.OrthographicCamera( -2000, 2000, 2000, -2000, 100000);
    camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 10 );
    light.position.set( 200,  500,  500 );
    scene.add( light );
    geometries = [];
    radius = 500;
//    num_geos = 10;
    num_geos = 2;
    rotation_speed = 0.002;
    var i
    for (i = 0; i < num_geos; i++)
    {
      if (i % 2 === 0)
      {
          geometries.push(new THREE.IcosahedronGeometry(radius));
      }
      else
      {
          new_geo = new THREE.DodecahedronGeometry(radius);
          new_geo.lookAt(new THREE.Vector3(0,1,0))
          geometries.push(new_geo);
      }
       radius *= 1.3142135623730951;
    }
    material = new THREE.MeshNormalMaterial( { wireframe: true, morphTargets: true} );
    meshes = [];
    for (i = 0; i < num_geos; i++)
    {
       meshes.push(new THREE.Mesh(geometries[i], material));
       if (i % 2 === 0)
       {
          meshes[i].rotation.x = 0;
       }
    }
    for (i = 0; i < num_geos; i++)
    {
       scene.add(meshes[i]);
    }
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer.domElement;

}

function animate() {

    requestAnimationFrame(animate);
    if (lastRotation.equals(rotationQuaternion) == false) {
      for (var i = 0; i < 2; i++)
      {
         meshes[i].rotation.setFromQuaternion(rotationQuaternion);
         console.log(meshes[i].rotation);
      }
      renderer.render(scene, camera);
//      lastRotation.copy(rotationQuaternion);
      rotationQuaternion.copy(lastRotation);
    }
}


export default class Quaternions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      children: [],
      rotX: 0,
      rotY: 0,
      rotZ: 0,
      rotW: 0,
    };
  }

  componentDidMount() {
    this.instance.appendChild(icosa);
    rotationQuaternion.setFromAxisAngle( new THREE.Vector3( 1, 1, 0 ), Math.PI / 2 );
    renderer.render(scene, camera);
  }

  changeQuaternion(x=0, y=0, z=0, w=0) {
    rotationQuaternion = rotationQuaternion.fromArray([x, y, z, w]);
    console.log(x,y,z,w,rotationQuaternion)
    this.setState({ rotX: x, rotY: y, rotZ: z, rotW: w});
  }

  render() {
    return (
    <div ref={el => (this.instance = el)}>
      <Table>
      <Table.Body width={'20%'} float={'left'} display={'block'} marginBottom={40}>
        <Table.Row key={'Real'} isSelectable={false}>
            <Table.TextCell>Real</Table.TextCell>
            <Table.TextCell>{this.state.rotX}</Table.TextCell>
        </Table.Row>
        <Table.Row key={'i'} isSelectable={false}>
            <Table.TextCell>i</Table.TextCell>
            <Table.TextCell>{this.state.rotY}</Table.TextCell>
        </Table.Row>
        <Table.Row key={'j'} isSelectable={false}>
            <Table.TextCell>j</Table.TextCell>
            <Table.TextCell>{this.state.rotZ}</Table.TextCell>
        </Table.Row>
        <Table.Row key={'k'} isSelectable={false}>
            <Table.TextCell>w</Table.TextCell>
            <Table.TextCell>{this.state.rotW}</Table.TextCell>
        </Table.Row>
      </Table.Body>
    </Table>
    <div className="slider-div">
    Real
    <Slider
        className={"range"}
        defaultValue={this.state.rotX}
        min={0}
        max={precision}
        onChange={(value) => {
          this.changeQuaternion(value / precision, this.state.rotY, this.state.rotZ, this.state.rotW);
        }}
    /></div>
    <div className="slider-div">
    i
    <Slider
        className={"range"}
        defaultValue={this.state.rotY}
        min={0}
        max={precision}
        onChange={(value) => {
          this.changeQuaternion(this.state.rotX, value/ precision, this.state.rotZ, this.state.rotW);
        }}
    /></div>
    <div className="slider-div">
    j
    <Slider
        className={"range"}
        defaultValue={this.state.rotZ}
        min={0}
        max={precision}
        onChange={(value) => {
          this.changeQuaternion(this.state.rotX, this.state.rotY, value / precision, this.state.rotW);
        }}
    /></div>
    <div className="slider-div">
    k
    <Slider
        className={"range"}
        defaultValue={this.state.rotW}
        min={0}
        max={precision}
        onChange={(value) => {
          this.changeQuaternion(this.state.rotX, this.state.rotY, this.state.rotZ, value / precision);
        }}
    /></div>
    </div>
    );
  }

}