import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import shad1Shader from './shaders/shad1.glsl'
import fragmentShader from './shaders/fragment.glsl'
import * as THREE from 'three'

// Handle window resize
// window.addEventListener('resize', onWindowResize, false);
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Globe setup
const geometry = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.MeshBasicMaterial({
    // color: 0x00ff00,  
    map: new THREE.TextureLoader().load('./img/globe.jpg')
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
const globe = new THREE.InstancedMesh(geometry, material, 1);
scene.add(globe);

camera.position.z = 15;

function animate() {
    requestAnimationFrame(animate);

    // Rotation logics
    // globe.rotation.x += 0.005;
    globe.rotation.y += 0.0005;

    renderer.render(scene, camera);
}



animate();