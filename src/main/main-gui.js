import * as THREE from 'three';
console.log('THREE', THREE);

import { OrbitControls } from 'three-orbitcontrols-ts';
import gsap from 'gsap';

import * as dat from 'dat.gui';
const gui = new dat.GUI();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

const geometry = new THREE.BoxGeometry(1, 1, 1); // 立方体
const material = new THREE.MeshBasicMaterial({ color: '#bfa' }); // 材质
const cube = new THREE.Mesh(geometry, material); // 网格
// cube.position.set(5, 0, 0);
scene.add(cube);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
const clock = new THREE.Clock();
const animation = {
  animatePositionX() {
    if (cube.position.x !== 0) {
      return;
    }
    gsap.to(cube.position, {
      x: 5,
      duration: 5,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true, // 往返
      onComplete() {
        console.log('complete');
      },
      onStart() {
        console.log('start');
      },
    });
  },
};
gui
  .add(cube.position, 'x')
  .min(0)
  .max(5)
  .step(0.01)
  .name('position x')
  .onChange((val) => {
    console.log(val);
  });
gui.addColor({ color: '#bbffaa' }, 'color').onChange((val) => {
  console.log('color change', val);
  cube.material.color.set(val);
});
gui.add(cube, 'visible').name('显示');

const folder = gui.addFolder('动画');
folder.add(animation, 'animatePositionX');
folder.add(cube.material, 'wireframe');
// gsap.to(cube.rotation, { x: Math.PI * 2, duration: 2 });
function render() {
  //   cube.position.x += 0.01;
  //   if (cube.position.x >= 1) {
  //     cube.position.x = 0;
  //   }
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render); // 浏览器的下一帧
}
render();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

// window.addEventListener('dblclick', () => {
//   const fullscreenElement = document.fullscreenElement;
//   if (!fullscreenElement) {
//     renderer.domElement.requestFullscreen();
//   } else {
//     document.exitFullscreen();
//   }
// });
