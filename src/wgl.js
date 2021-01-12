/**
 * webgl set
 * use three.js 
 */
// import _ from 'lodash'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const wgl = () => {
    
    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0x505050));
    //light
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.2;
    spotLight.position.set(2, 3, 3);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 3;
    spotLight.shadow.camera.far = 10;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);

    const dirLight = new THREE.DirectionalLight(0x55505a, 1);
    dirLight.position.set(0, 3, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 10;

    dirLight.shadow.camera.right = 1;
    dirLight.shadow.camera.left = - 1;
    dirLight.shadow.camera.top = 1;
    dirLight.shadow.camera.bottom = - 1;

    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    //floor
    let floorMat = new THREE.MeshStandardMaterial({
        roughness: 0.8,
        color: 0xffffff,
        metalness: 0.2,
        bumpScale: 0.0005
    });
    const floorGeometry = new THREE.PlaneBufferGeometry(100, 100);
    const floorMesh = new THREE.Mesh(floorGeometry, floorMat);
    floorMesh.receiveShadow = true;
    floorMesh.rotation.x = - Math.PI / 2.0;
    scene.add(floorMesh);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const material2 = new THREE.MeshBasicMaterial({ color: 0xFF9999 });
    const material3 = new THREE.MeshBasicMaterial({ color: 0x99CCFF });
    const cube1 = new THREE.Mesh(geometry, material1);
    cube1.position.set(-2, 0, 0);

    const cube2 = new THREE.Mesh(geometry, material2);
    cube2.position.set(0, 0, 0);

    const cube3 = new THREE.Mesh(geometry, material3);
    cube3.position.set(2, 0, 0);

    const group = new THREE.Group();
    // group.add(cube1);
    group.add(cube2);
    // group.add(cube3);

    scene.add(group);

    //camera
    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.25, 16);
    camera.position.set( 0, 1.0, 5);

    scene.position.z = 1;
    //controls
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 1;
    controls.maxDistance = 100;
    controls.enableZoom = true;
    controls.target.set( 0, 1, 0 );
    controls.enableRotate = true
    controls.update();
    // const position.z = 10;animate = function () {
    //     requestAnimationFrame( animate );

    //     cube.rotation.x += 0.01;
    //     cube.rotation.y += 0.01;

    //     renderer.render( scene, camera );
    // };
    console.log('renderer',renderer)
    renderer.render(scene, camera);

 
}
export default wgl