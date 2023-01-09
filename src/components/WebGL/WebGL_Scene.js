import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// Defaulted values, ignore.
let RENDER_Default = {
	Orbit_Enable: false,
	Pan_Enable:   false,
	Zoom_Enable:  false,
	Max_Zoom:     10,
	Camera_Z:     2000
}
let CAMERA_Default = {
	FOV:    70,
	ASPECT: 0,
	NEAR:   .1,
	FAR:    1000
}

export default function WebGL_New(RENDER_DIV, RENDER_OPTIONS, CAMERA_OPTIONS) {
	// Overloads
	RENDER_OPTIONS = RENDER_OPTIONS === undefined ? RENDER_Default : RENDER_OPTIONS
	CAMERA_OPTIONS = CAMERA_OPTIONS === undefined ? CAMERA_Default : CAMERA_OPTIONS

	const W = RENDER_DIV.offsetWidth
	const H = RENDER_DIV.offsetHeight
	CAMERA_OPTIONS.ASPECT = CAMERA_OPTIONS.ASPECT ? CAMERA_OPTIONS.ASPECT : W/H

	// Start WebGL
	const Renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	})
	Renderer.setPixelRatio(window.devicePixelRatio)
	Renderer.setSize(W, H)
	RENDER_DIV.appendChild(Renderer.domElement)

	// Create the virtual camera
	const Camera = new THREE.PerspectiveCamera(CAMERA_OPTIONS.FOV, CAMERA_OPTIONS.ASPECT, .1, 1000)
	const Scene = new THREE.Scene()

	// Controls
	const Orbit = new OrbitControls(Camera, Renderer.domElement)
	Orbit.enabled     = RENDER_OPTIONS.Orbit_Enable
	Orbit.enablePan   = RENDER_OPTIONS.Pan_Enable
	Orbit.enableZoom  = RENDER_OPTIONS.Zoom_Enable
	Orbit.maxZoom     = RENDER_OPTIONS.Max_Zoom
	Camera.position.z = RENDER_OPTIONS.Camera_Z

	return {
		Renderer: Renderer,
		Camera:   Camera,
		Scene:    Scene,
		Orbit:    Orbit
	}
}