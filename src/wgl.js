/**
 * webgl set
 * use three.js 
 */
// import _ from 'lodash'
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
/**
 * 
 */
const wgl = () => {
    let {
        scene,
        camera,
        renderer
    } = createBasis()

    createFloor(scene)
    // createLight(scene)
    createGeo(scene)
    createFont(scene)
    createTextur(scene)
    let {dirLight} = createLight(scene)
    createTool(scene, camera, renderer)
    init(scene, camera, renderer,dirLight)
}
const createBasis = () => {
    //scene
    const scene = new THREE.Scene();
    scene.rotation.set(-0.7, 0, 0) 
    // scene.background = new THREE.Color(0xcce0ff);
    // scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);
    // scene.add(new THREE.AmbientLight(0x505050));
    //camera
    const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.25, 25);
    camera.position.set(0, 0, 20);
    //renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    return {
        scene,
        camera,
        renderer
    }

}
const createFloor = (scene) => {
    let floorMat = new THREE.MeshStandardMaterial({
        roughness: 0.8,
        color: 0xffffff,
        metalness: 0.2,
        bumpScale: 0.0005
    });
    //floor
    const floorGeometry = new THREE.PlaneBufferGeometry(11, 10);
    const floorMesh = new THREE.Mesh(floorGeometry, floorMat);
    floorMesh.receiveShadow = true;
    // floorMesh.rotation.x = -Math.PI / 2.0;
    scene.add(floorMesh);
}
const createLight = (scene) => {
    //light
    const spotLight = new THREE.PointLight(0xffffff,5);
    spotLight.position.set( 0, 10, 1 );
    // spotLight.castShadow = true;
    // scene.add(spotLight);
    //dirLight
    const dirLight = new THREE.DirectionalLight(0xffffff, 10);
   
    dirLight.position.set( 0,0, 3 );
    dirLight.castShadow = true;
    // dirLight.shadow.camera.near = 1;
    // dirLight.shadow.camera.far = 10;
    // dirLight.shadow.camera.right = 1;
    // dirLight.shadow.camera.left = -1;
    // dirLight.shadow.camera.top = 1;
    // dirLight.shadow.camera.bottom = -1;
    // dirLight.shadow.mapSize.width = 1024;
    // dirLight.shadow.mapSize.height = 1024;
    var helper = new THREE.DirectionalLightHelper( dirLight,2,'#ff0000');
    scene.add( helper );
    scene.add(dirLight);
    return {dirLight}
}
const createGeo = (scene) => {
    const arr = [{
        geol: 0.5,
        geow: 0.5,
        geoh: 11,

        x: -5.2,
        y: 0,
        z: 0,
    },
    {
        geol: 0.5,
        geow: 0.5,
        geoh: 11,

        x: 5.2,
        y: 0,
        z: 0,
    },{
        geol: 0.5,
        geow: 10,
        geoh: 1,

        x: 0,
        y: 5,
        z: 0,
    },{
        geol: 0.5,
        geow: 10,
        geoh: 0.5,

        x: 0,
        y: 1,
        z: 0,
    },{
        geol: 0.3,
        geow: 10,
        geoh: 3.5,

        x: 0,
        y: -1,
        z: 0,
    },]

    const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
    material.lights= true
    const group = new THREE.Group();
    arr.forEach(item => {
        let {
            geow,
            geol,
            geoh,
            x,
            y,
            z
        } = item
        const topgeometry = new THREE.BoxGeometry(geow, geoh, geol);
        const top = new THREE.Mesh(topgeometry, material);
        top.position.set(x, y, z);
        top.receiveShadow = true;
        top.castShadow = true; 
        group.add(top);
    })

    scene.add(group)
}
const createTextur = (scene) => {
    var loader = new THREE.TextureLoader();
    loader.load( '/show.png', function ( texture ) {


        const material = new THREE.MeshBasicMaterial( { map: texture } );

        const quad = new THREE.PlaneBufferGeometry( 10, 3.5 );

        const mesh = new THREE.Mesh( quad, material );
        mesh.position.set(0, 3, 0);

        scene.add( mesh );

    } );
}
const createFont = (scene) => {

    const loader = new THREE.FontLoader();

    let fonts = [
        {
            text:'logo',
            x:-5,
            y:4.9,
            z:0.2

        },{
            text:'主页',
            x:-3,
            y:4.9,
            z:0.2
        },
        {
            text:'团队介绍',
            x:-1,
            y:4.9,
            z:0.2
        },
        {
            text:'加入我们',
            x:2,
            y:4.9,
            z:0.2
        },
        //tab
        {
            text:'图像技术',
            x:-4,
            y:1,
            z:0.2
        },
        {
            text:'文字识别',
            x:-2,
            y:1,
            z:0.2
        },
        {
            text:'车辆分析',
            x:0,
            y:1,
            z:0.2
        },
        {
            text:'人脸识别',
            x:2,
            y:1,
            z:0.2
        },{
            text:'视频技术',
            x:4,
            y:1,
            z:0.2
        },
        //other
        {
            text:'文字识别',
            x:-4,
            y:0,
            z:0.2
        },
        {
            text:'支持多场景、高精度的文字检测与识别服务，广泛应用于发票、火车票以及身份证等文字识别。',
            x:-4,
            y:-0.5,
            z:0.2
        },
        {
            text:'产品优势',
            x:-4,
            y:-1,
            z:0.2
        },
        {
            text:'支持多语言、多尺度、多方向以及多场景中的文字识别；利用深度学习技术及精确算法不断优化训练模型，准确率高达99% ；标准化接口，',
            x:-4,
            y:-1.5,
            z:0.2
        },
        {
            text:'上传图片即可获得结果，使服务更加便捷。',
            x:-4,
            y:-1.8,
            z:0.2
        },
        {
            text:'产品功能',
            x:0,
            y:-2.5,
            z:0.2
        },
    ]
    loader.load('/test.json', function (font) {
        const color = new THREE.Color(0x006699);
        const matLite = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide,
            x: 50
        });


        fonts.forEach(item => {
            const geometry = new THREE.TextGeometry(item.text, {
                font: font,
                size: 0.1,
                height: 0.08,
                curveSegments: 12,
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8,
                bevelSegments: 5,
    
            });
    
            geometry.computeBoundingBox();
    
            geometry.translate(item.x, item.y, item.z);
    
            const text = new THREE.Mesh(geometry, matLite);
    
            scene.add(text);
        })
      
    }); //end load function
}
const createTool = (scene, camera, renderer) => {

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
}
const init = (scene, camera, renderer,dirLight) => {
    let x = -15
    function animate() {
        
        x= x+ 0.1
        requestAnimationFrame(animate);
        // dirLight.position.set( x,0, 3 );
        renderer.render(scene, camera);
        
    }
    animate()
}


const _wgl = () => {


			THREE.Cache.enabled = true;

			let container, stats, permalink, hex;

			let camera, cameraTarget, scene, renderer;

			let group, textMesh1, textMesh2, textGeo, materials;

			let firstLetter = true;

			let text = "three.js",

				bevelEnabled = true,

				font = undefined,

				fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
				fontWeight = "bold"; // normal bold

			const height = 20,
				size = 70,
				hover = 30,

				curveSegments = 4,

				bevelThickness = 2,
				bevelSize = 1.5;

			const mirror = true;

			const fontMap = {

				"helvetiker": 0,
				"optimer": 1,
				"gentilis": 2,
				"droid/droid_sans": 3,
				"droid/droid_serif": 4

			};

			const weightMap = {

				"regular": 0,
				"bold": 1

			};

			const reverseFontMap = [];
			const reverseWeightMap = [];

			for ( const i in fontMap ) reverseFontMap[ fontMap[ i ] ] = i;
			for ( const i in weightMap ) reverseWeightMap[ weightMap[ i ] ] = i;

			let targetRotation = 0;
			let targetRotationOnPointerDown = 0;

			let pointerX = 0;
			let pointerXOnPointerDown = 0;

			let windowHalfX = window.innerWidth / 2;

			let fontIndex = 1;

			init();
			animate();

			function decimalToHex( d ) {

				let hex = Number( d ).toString( 16 );
				hex = "000000".substr( 0, 6 - hex.length ) + hex;
				return hex.toUpperCase();

			}

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				// permalink = document.getElementById( "permalink" );

				// CAMERA

				camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1500 );
				camera.position.set( 0, 400, 700 );

				cameraTarget = new THREE.Vector3( 0, 150, 0 );

				// SCENE

				scene = new THREE.Scene();
				// scene.background = new THREE.Color( 0x000000 );
				// scene.fog = new THREE.Fog( 0x000000, 250, 1400 );

				// LIGHTS

				const dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
				dirLight.position.set( 0, 0, 1 ).normalize();
				// scene.add( dirLight );

				const pointLight = new THREE.PointLight( 0xffffff, 1.5 );
				pointLight.position.set( 0, 100, 90 );
				scene.add( pointLight );

				// Get text from hash

				const hash = document.location.hash.substr( 1 );

				// if ( hash.length !== 0 ) {

				// 	const colorhash = hash.substring( 0, 6 );
				// 	const fonthash = hash.substring( 6, 7 );
				// 	const weighthash = hash.substring( 7, 8 );
				// 	const bevelhash = hash.substring( 8, 9 );
				// 	const texthash = hash.substring( 10 );

				// 	hex = colorhash;
				// 	pointLight.color.setHex( parseInt( colorhash, 16 ) );

				// 	fontName = reverseFontMap[ parseInt( fonthash ) ];
				// 	fontWeight = reverseWeightMap[ parseInt( weighthash ) ];

				// 	bevelEnabled = parseInt( bevelhash );

				// 	text = decodeURI( texthash );

				// 	updatePermalink();

				// } else {

				// 	pointLight.color.setHSL( Math.random(), 1, 0.5 );
				// 	hex = decimalToHex( pointLight.color.getHex() );

				// }

				materials = [
					// new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
					new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
				];

				group = new THREE.Group();
				group.position.y = 100;

				scene.add( group );

				loadFont();

				const plane = new THREE.Mesh(
					new THREE.PlaneBufferGeometry( 10000, 10000 ),
					new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.5, transparent: true } )
				);
				plane.position.y = 100;
				plane.rotation.x = - Math.PI / 2;
				scene.add( plane );

				// RENDERER

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				// EVENTS

				

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function boolToNum( b ) {

				return b ? 1 : 0;

			}

			function updatePermalink() {

				const link = hex + fontMap[ fontName ] + weightMap[ fontWeight ] + boolToNum( bevelEnabled ) + "#" + encodeURI( text );

				window.location.hash = link;

			}

			function onDocumentKeyDown( event ) {

				if ( firstLetter ) {

					firstLetter = false;
					text = "";

				}

				const keyCode = event.keyCode;

				// backspace

				if ( keyCode == 8 ) {

					event.preventDefault();

					text = text.substring( 0, text.length - 1 );
					refreshText();

					return false;

				}

			}

			function onDocumentKeyPress( event ) {

				const keyCode = event.which;

				// backspace

				if ( keyCode == 8 ) {

					event.preventDefault();

				} else {

					const ch = String.fromCharCode( keyCode );
					text += ch;

					refreshText();

				}

			}

			function loadFont() {

				const loader = new THREE.FontLoader();
				loader.load( '/test.json', function ( response ) {

					font = response;

					refreshText();

				} );

			}

			function createText() {

				textGeo = new THREE.TextGeometry( text, {

					font: font,

					size: size,
					height: height,
					curveSegments: curveSegments,

					bevelThickness: bevelThickness,
					bevelSize: bevelSize,
					bevelEnabled: bevelEnabled

				} );

				textGeo.computeBoundingBox();
				textGeo.computeVertexNormals();

				const triangle = new THREE.Triangle();

				// "fix" side normals by removing z-component of normals for side faces
				// (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)

				// if ( ! bevelEnabled ) {

				// 	const triangleAreaHeuristics = 0.1 * ( height * size );

				// 	for ( let i = 0; i < textGeo.faces.length; i ++ ) {

				// 		const face = textGeo.faces[ i ];

				// 		if ( face.materialIndex == 1 ) {

				// 			for ( let j = 0; j < face.vertexNormals.length; j ++ ) {

				// 				face.vertexNormals[ j ].z = 0;
				// 				face.vertexNormals[ j ].normalize();

				// 			}

				// 			const va = textGeo.vertices[ face.a ];
				// 			const vb = textGeo.vertices[ face.b ];
				// 			const vc = textGeo.vertices[ face.c ];

				// 			const s = triangle.set( va, vb, vc ).getArea();

				// 			if ( s > triangleAreaHeuristics ) {

				// 				for ( let j = 0; j < face.vertexNormals.length; j ++ ) {

				// 					face.vertexNormals[ j ].copy( face.normal );

				// 				}

				// 			}

				// 		}

				// 	}

				// }

				const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

				textGeo = new THREE.BufferGeometry().fromGeometry( textGeo );

				textMesh1 = new THREE.Mesh( textGeo, materials );

				textMesh1.position.x = centerOffset;
				textMesh1.position.y = hover;
				textMesh1.position.z = 0;

				textMesh1.rotation.x = 0;
				textMesh1.rotation.y = Math.PI * 2;

				group.add( textMesh1 );

				// if ( mirror ) {

				// 	textMesh2 = new THREE.Mesh( textGeo, materials );

				// 	textMesh2.position.x = centerOffset;
				// 	textMesh2.position.y = - hover;
				// 	textMesh2.position.z = height;

				// 	textMesh2.rotation.x = Math.PI;
				// 	textMesh2.rotation.y = Math.PI * 2;

				// 	group.add( textMesh2 );

				// }

			}

			function refreshText() {

				updatePermalink();

				group.remove( textMesh1 );
				if ( mirror ) group.remove( textMesh2 );

				if ( ! text ) return;

				createText();

			}

			function onPointerDown( event ) {

				if ( event.isPrimary === false ) return;

				pointerXOnPointerDown = event.clientX - windowHalfX;
				targetRotationOnPointerDown = targetRotation;

				document.addEventListener( 'pointermove', onPointerMove, false );
				document.addEventListener( 'pointerup', onPointerUp, false );

			}

			function onPointerMove( event ) {

				if ( event.isPrimary === false ) return;

				pointerX = event.clientX - windowHalfX;

				targetRotation = targetRotationOnPointerDown + ( pointerX - pointerXOnPointerDown ) * 0.02;

			}

			function onPointerUp() {

				if ( event.isPrimary === false ) return;

				document.removeEventListener( 'pointermove', onPointerMove );
				document.removeEventListener( 'pointerup', onPointerUp );

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();

			}

			function render() {

				group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;

				camera.lookAt( cameraTarget );

				renderer.clear();
				renderer.render( scene, camera );

			}
}
export default wgl