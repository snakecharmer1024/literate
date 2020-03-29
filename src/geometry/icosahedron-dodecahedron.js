import React, { Component } from 'react';

var THREE = require('three');
var camera, scene, renderer;
var material, meshes;
var light, geometries, num_geos, radius, rotation_speed, new_geo

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
    radius = 100;
    num_geos = 10;
    new_geo = null;
    rotation_speed = 0.002;
    var i
    for (i = 0; i < num_geos; i++)
    {
      if (i % 2 === 0)
      {
          new_geo = new THREE.DodecahedronGeometry(radius);
          new_geo.lookAt(new THREE.Vector3(0,1,0))
          geometries.push(new_geo);
      }
      else
      {
          geometries.push(new THREE.IcosahedronGeometry(radius));
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

    for (var i = 0; i < num_geos; i++)
    {
       meshes[i].rotation.x += rotation_speed;
       meshes[i].rotation.y += rotation_speed;
    }
    renderer.render(scene, camera);
}

export default class IcosahedronDodecahedron extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      children: []
    };
  }
  componentDidMount() {
    this.instance.appendChild(icosa);
  }

  render() {
    return <div ref={el => (this.instance = el)} />;
  }
}
