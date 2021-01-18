/**
 * webgl set
 * use three.js 
 */
// import _ from 'lodash'
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const wgl = () => {
    const scene = new THREE.Scene();

    scene.rotation.set(0.5,0,0)
    scene.background = new THREE.Color( 0xcce0ff );
	scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );

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
    //dirLight
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
    //floor
    const floorGeometry = new THREE.PlaneBufferGeometry(10, 10);
    const floorMesh = new THREE.Mesh(floorGeometry, floorMat);
    floorMesh.receiveShadow = true;
    floorMesh.rotation.x = - Math.PI / 2.0;
    scene.add(floorMesh);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // const geometry = new THREE.BoxGeometry(10,0.2,1);
    // const material1 = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
    // const material = new THREE.MeshNormalMaterial();
    // const material3 = new THREE.MeshBasicMaterial({ color: 0x99CCFF });

    // const cube1 = new THREE.Mesh(geometry, material1);
    // cube1.position.set(-2, 0, 0);

    // const cube3 = new THREE.Mesh(geometry, material3);
    // cube3.position.set(2, 0, 0);

    // const cube2 = new THREE.Mesh(geometry, material);
    // cube2.position.set(0, 0, -4.5);

    // const topgeometry = new THREE.BoxGeometry(1,0.2,1);
    // const top = new THREE.Mesh(topgeometry, material);
    // top.position.set(-4.5, 0.1, -4.5);

    // const group = new THREE.Group();
    // group.add(cube2);
    // group.add(top);

    let group = creat()
    // group.add(cube1);
    // group.add(cube3);
    scene.add(group);
    //camera
    const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.25, 16);
    camera.position.set(0, 1.3, 10);
    scene.position.z = 1;
    //controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();
    // GUI
    const gui = new dat.GUI();
    const cameraFolder = gui.addFolder("Camera")
    cameraFolder.add(camera.position, "z", 0, 100, 0.01)
    cameraFolder.add(camera.position, "x", 0, 100, 0.01)
    cameraFolder.add(camera.position, "y", 0, 100, 0.01)
    const scenerFolder = gui.addFolder("Scene rotation")
    scenerFolder.add(scene.rotation, "z", 0, 100, 0.01)
    scenerFolder.add(scene.rotation, "x", 0, 100, 0.001)
    scenerFolder.add(scene.rotation, "y", 0, 100, 0.01)
    const sceneFolder = gui.addFolder("Scene position")
    sceneFolder.add(scene.position, "z", 0, 100, 0.01)
    sceneFolder.add(scene.position, "x", 0, 100, 0.01)
    sceneFolder.add(scene.position, "y", 0, 100, 0.01)

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate()
}

const creat  =() => {
    //w width
    //l long
    //h height

    const box1 = {
        geol:1,
        geow:1,
        geoh:0.33,
 
        x:-4.5,
        y:0.1,
        z:-4.5,
    }

    const box2 = {
        geol:2,
        geow:2,
        geoh:0.33,

        x:0,
        y:0.1,
        z:-4.5,
    }

    const arr = [box1,box2]

    const material = new THREE.MeshNormalMaterial();
    const group = new THREE.Group();
    arr.forEach(item=> {
        let {geow,geol,geoh,x,y,z} = item
        const topgeometry = new THREE.BoxGeometry(geow,geoh,geol);
        const top = new THREE.Mesh(topgeometry, material);
        top.position.set(x, y, z);
        group.add(top);
    })
    

    return group
} 
export default wgl