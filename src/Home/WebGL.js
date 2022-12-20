/*


	@Author: interpreterK (https://github.com/interpreterK)
*/

// Import ThreeJS
import * as THREE from 'three'

const {sin, cos, floor, random} = Math
const Objects1 = []
const Objects2 = []
let tick = 0

// Start WebGL renderer
const Renderer = new THREE.WebGLRenderer({antialias: true})
Renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(Renderer.domElement)

// ThreeJS camera
const Camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, .01, 10)
const Scene = new THREE.Scene()
Camera.position.z = 1

// Functions
function RandomInt(x) {
    return floor(random()*x)
}

const Instance = {
    Box: Box_Instance,
}

function Box_Instance(BoxGeometry) {
	const Geometry = new THREE.BoxGeometry(...BoxGeometry)
	const Material = new THREE.MeshNormalMaterial()
	const Mesh = new THREE.Mesh(Geometry, Material)

	return {
        Geometry: Geometry,
        Material: Material,
        Mesh: Mesh
    }
}

function Vector3(x,y,z) {
	return new THREE.Vector3(x,y,z)
}
// - End Functions -

for (let i = 0; i < 10; i++) {
	Objects1[i] = Instance.Box([.2,.2,.2])
	const Object = Objects1[i].Mesh
	
	Scene.add(Object)
}
for (let i = 0; i < 20; i++) {
	Objects2[i] = Instance.Box([.1,.1,.1])
	Scene.add(Objects2[i].Mesh)
}

Renderer.setAnimationLoop((deltaTime) => {
	tick += 1
	Objects1.forEach((item, index) => {
		item.Mesh.rotation.x = cos(deltaTime/1200)
		item.Mesh.rotation.y = sin(deltaTime/1500)
		item.Mesh.rotation.z = cos(deltaTime/4000)
		item.Mesh.position.x = (sin(tick/350)-(index/2))+2
		item.Mesh.position.z = (cos(tick/350)-(index/2))+2
	})
	Objects2.forEach((item, index) => {
		item.Mesh.rotation.x = -cos(deltaTime/1200)
		item.Mesh.rotation.y = -sin(deltaTime/1500)
		item.Mesh.rotation.z = -cos(deltaTime/4000)
		item.Mesh.position.x = (-sin(tick/500)-(index/3))+3
		item.Mesh.position.y = .4
	})
	Renderer.render(Scene, Camera);
})

// Resize support for the ThreeJS canvas.
window.addEventListener('resize', () => {
    Camera.aspect = window.innerWidth/window.innerHeight
    Camera.updateProjectionMatrix()
    Renderer.setSize(window.innerWidth, window.innerHeight)
}, false)