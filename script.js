// Set up the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the 3D model
const loader = new THREE.GLTFLoader();
loader.load('images/insta.glb', function(gltf) {
  const logo = gltf.scene;
  scene.add(logo);
});

// Set up the raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Set up the animation
const animation = new GSAPAnimation(logo);

// Handle user interactions
function handleMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function handleMouseClick(event) {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    animation.start();
  }
}

// Set up the animation
class GSAPAnimation {
  constructor(object) {
    this.object = object;
    this.keyframes = [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1 },
      { x: 2, y: 2, z: 2 },
      // Add more keyframes here
    ];
    this.currentKeyframe = 0;
    this.animation = null;
  }

  start() {
    this.currentKeyframe = 0;
    this.animation = gsap.to(this.object.position, {
      x: this.keyframes[this.currentKeyframe].x,
      y: this.keyframes[this.currentKeyframe].y,
      z: this.keyframes[this.currentKeyframe].z,
      duration: 1,
      onComplete: () => {
        this.currentKeyframe++;
        if (this.currentKeyframe < this.keyframes.length) {
          this.animation.restart();
        } else {
          this.animation.pause();
        }
      },
    });
  }

  stop() {
    this.animation.pause();
  }
}

// Set up event listeners
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('click', handleMouseClick);

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();