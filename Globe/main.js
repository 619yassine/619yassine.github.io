import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import shad1Shader from './shaders/shad1.glsl'
import fragmentShader from './shaders/fragment.glsl'
import getStars from './src/getStars.js';
import { getFresnelMat } from "./src/getFresnelMat.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

let orbbit = new OrbitControls( camera, renderer.domElement );
// orbbit.zoomToCursor = true;
orbbit.minDistance = 0.75;
// Globe setup
const geometry = new THREE.IcosahedronGeometry(0.5, 24);
const material = new THREE.MeshStandardMaterial({
    // color: 0x00ff00,  
    map: new THREE.TextureLoader().load('./img/8k_earth_daymap.jpg'),
    specularMap: new THREE.TextureLoader().load('./img/8k_earth_specular_map.jpg'),
    bumpMap: new THREE.TextureLoader().load('./img/8k_earth_normal_map.jpg'),
    bumpScale: 0.5
    // wireframe: true
});
// const material = new THREE.ShaderMaterial({
//   shad1Shader,
//   fragmentShader,
//   uniforms: {
//     globeTexture: {
//       value: new THREE.TextureLoader().load('./img/globe.jpg')
//     }
//   }
// });
// console.log(new THREE.TextureLoader().load('./img/globe.jpg'))
const globe = new THREE.Mesh(geometry, material);
earthGroup.add(globe);

const stars = getStars();
scene.add(stars);

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

const lightsMat = new THREE.MeshBasicMaterial({
  // transparent: true,
  opacity: 0.3,
  map: new THREE.TextureLoader().load("./img/8k_earth_nightmap.jpg"),
  blending: THREE.AdditiveBlending
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);


const cloudsMat = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./img/8k_earth_clouds.jpg"),
  transparent: true,
  opacity: 0.5,
  blending: THREE.AdditiveBlending,
  // alphaMap: loader.load('./textures/05_earthcloudmaptrans.jpg'),
  // alphaTest: 0.3,
});
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.001);
earthGroup.add(cloudsMesh);


const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.001);
earthGroup.add(glowMesh);


function animate() {
    requestAnimationFrame(animate);
    const earthSpeed = 0.0005;
    // Rotation logics
    // globe.rotation.x += 0.005;
    globe.rotation.y += earthSpeed;
    lightsMesh.rotation.y += earthSpeed;
    stars.rotation.y -= earthSpeed + 0.0001;
    cloudsMesh.rotation.y += earthSpeed - 0.0001;
    glowMesh.rotation.y += earthSpeed - 0.0001;
    // if (camera.position.z < 0.75){
    //   camera.position.z = 0.75;
    // }
    // else (camera.position.z > -0.75){
    //   camera.position.z = -0.75;
    // }

    renderer.render(scene, camera);
}



animate();


// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);