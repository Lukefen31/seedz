const container = document.querySelector('#seed');
const width = container.clientWidth;
const height = container.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);
renderer.setClearColor(0x000000, 0); // Set the clear color to transparent
container.appendChild(renderer.domElement);

// Add a simple directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const loader = new THREE.GLTFLoader();
loader.load('https://cdn.shopify.com/s/files/1/0729/8128/3161/files/seed.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);

  const animate = () => {
    requestAnimationFrame(animate);

    model.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();
});

container.addEventListener('mousemove', (event) => {
  const mouseX = event.clientX / width * 2 - 1;
  const mouseY = -(event.clientY / height) * 2 + 1;

  camera.position.x = mouseX * 2;
  camera.position.y = mouseY * 2;
  camera.lookAt(scene.position);
});
