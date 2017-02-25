var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {
    camera = new THREE.OrthographicCamera( -2000, 2000, 2000, -2000, 0, 100000 );
//    camera = new THREE.PerspectiveCamera(1500, window.innerWidth / window.innerHeight, 0.1, 1000000);
    camera.position.z = 2000;

    scene = new THREE.Scene();
    light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 10 );
    light.position.set( 200,  500,  500 );
    scene.add( light );
    geometries = [];
    num_geos = 100;
    radius = 1;
    for (i = 0; i < num_geos; i++)
    {

       geometries.push(new THREE.TetrahedronGeometry(radius));
       radius *= -1.4142135623730951;
    }
    material = new THREE.MeshNormalMaterial( { wireframe: true, morphTargets: true} );
    meshes = [];
    for (i = 0; i < num_geos; i++)
    {
       meshes.push(new THREE.Mesh(geometries[i], material));
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
        meshes[i].rotation.x += 0.002;
        meshes[i].rotation.y += 0.002;
        meshes[i].rotation.z += 0.002;
        meshes[i].radius *= 1.1;
    }
    //camera.position.z *= 0.99;
    renderer.render(scene, camera);

}

document.onkeydown = function(e) {
    speed = 0.01;
    switch (e.keyCode) {
        case 37:
            camera.position.z -= 100*speed;
            for (i = 0; i < num_geos; i++)
            {
       //          meshes[i].rotation.x -= speed;
            }
            break;
        case 38:
            for (i = 0; i < num_geos; i++)
            {
                 meshes[i].rotation.y += speed;
            }
            break;
        case 39:
            for (i = 0; i < num_geos; i++)
            {
                 meshes[i].rotation.x += speed;
            }
            break;
        case 40:
            for (i = 0; i < num_geos; i++)
            {
                 meshes[i].rotation.y -= speed;
            }
            break;
    }
};
