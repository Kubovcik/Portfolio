// app.js

// Create a new Three.js scene
const scene = new THREE.Scene();

// Create a new camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a new renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas').appendChild(renderer.domElement);

// Load the 3D model using the GLTFLoader
const loader = new THREE.GLTFLoader();
loader.load('instagram.gltf', (gltf) => {
  const model = gltf.scene;
  scene.add(model);

  // Add an event listener to the model that listens for click events
  model.addEventListener('click', () => {
    // Trigger an animation when the model is clicked
    model.rotation.y += Math.PI / 2;
  });

  // Render the scene
  const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();
});