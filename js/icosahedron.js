var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 10 );
    light.position.set( 200,  500,  500 );
    scene.add( light );
    geometries = [];
    radius = 300;
    num_geos = 10;
    rotation_speed = 0.002;
    for (i = 0; i < num_geos; i++)
    {
      if (i % 2 == 0)
      {
          geometries.push(new THREE.DodecahedronGeometry(radius));
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
       if (i % 2 == 0)
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

    document.body.appendChild(renderer.domElement);

}

function animate() {

    requestAnimationFrame(animate);

    for (i = 0; i < num_geos; i++)
    {
       meshes[i].rotation.x += rotation_speed;
       meshes[i].rotation.y += rotation_speed;
    }
    renderer.render(scene, camera);

}

