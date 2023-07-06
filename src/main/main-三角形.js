import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

// 酷炫三角形
for (let i = 0; i < 20; i++) {
  const geometry = new THREE.BufferGeometry();
  const positionArray = new Float32Array(9); // 9个值
  for (let j = 0; j < 9; j++) {
    positionArray[j] = Math.random() * 10 - 5;
  }
  const color = new THREE.Color(Math.random(), Math.random(), Math.random());
  console.log(color);
  const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 });
  geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3)); // 每3个组合为一个坐标
  const mesh = new THREE.Mesh(geometry, material); // 网格
  scene.add(mesh);
}

const axesHelper = new THREE.AxesHelper(20); //显示xyz轴 红绿蓝 20长度
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 惯性

function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});
