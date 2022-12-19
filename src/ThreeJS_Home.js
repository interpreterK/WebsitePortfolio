/*


	@Author: interpreterK (https://github.com/interpreterK)
*/

// Import ThreeJS
import * as THREE from 'three'

// Start WebGL renderer
const Renderer = new THREE.WebGLRenderer({antialias: true})
Renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(Renderer.domElement)

// ThreeJS camera
const Camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, .01, 10)
const Scene = new THREE.Scene()
Camera.position.z = 1

// Functions
function Instance(BoxGeometry) {
	const Geometry = new THREE.BoxGeometry(...BoxGeometry)
	const Material = new THREE.MeshNormalMaterial()
	const Mesh = new THREE.Mesh(Geometry, Material)
	
	return {Geometry: Geometry, Material: Material, Mesh: Mesh}
}
// - End Functions -

const {sin, cos, random} = Math
let tick = 0

const Objects1 = []
const Objects2 = []

for (let i = 0; i < 10; i++) {
	Objects1[i] = Instance([.2,.2,.2])
	const Object = Objects1[i].Mesh
	Object.rotation.set(random()*2,random()*2,random()*2)

	Scene.add(Object)
}
for (let i = 0; i < 15; i++) {
	Objects2[i] = Instance([.1,.1,.1])
	Scene.add(Objects2[i].Mesh)
}

Renderer.setAnimationLoop((deltaTime) => {
	tick += 1
	Objects1.forEach((item, index) => {
		item.Mesh.rotation.x = cos(deltaTime/1200)
		item.Mesh.rotation.y = sin(deltaTime/1500)
		item.Mesh.rotation.z = cos(deltaTime/4000)
		item.Mesh.position.x = (sin(tick/100)-(index/2))+2
	})
	Objects2.forEach((item, index) => {
		item.Mesh.rotation.x = deltaTime/2000
		item.Mesh.rotation.y = deltaTime/1000
		item.Mesh.position.x = (-sin(tick/100)-(index/3))+2
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