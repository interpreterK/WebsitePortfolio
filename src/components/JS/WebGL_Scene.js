import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as fLibrary from './fLibrary.js'

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
let WEBGL_Default = {
	antialias: true,
	alpha:     true
}

export default function WebGL_New(RENDER_DIV, RENDER_OPTIONS, CAMERA_OPTIONS, WEBGL_OPTIONS) {
	// Overloads
	RENDER_OPTIONS = fLibrary.s_Circuit(RENDER_OPTIONS, RENDER_Default)
	CAMERA_OPTIONS = fLibrary.s_Circuit(CAMERA_OPTIONS, CAMERA_Default)
	WEBGL_OPTIONS  = fLibrary.s_Circuit(WEBGL_OPTIONS,  WEBGL_Default)

	const W = RENDER_DIV.offsetWidth
	const H = RENDER_DIV.offsetHeight

	// Start WebGL
	const Renderer = new THREE.WebGLRenderer({
		antialias: fLibrary.s_Circuit(WEBGL_OPTIONS.antialias, WEBGL_Default.antialias),
		alpha:     fLibrary.s_Circuit(WEBGL_OPTIONS.alpha,     WEBGL_Default.alpha) 
	})
	Renderer.setPixelRatio(window.devicePixelRatio)
	Renderer.setSize(W, H)
	RENDER_DIV.appendChild(Renderer.domElement)

	// Create the virtual camera
	CAMERA_OPTIONS.ASPECT = CAMERA_OPTIONS.ASPECT ? CAMERA_OPTIONS.ASPECT : W/H
	const Camera = new THREE.PerspectiveCamera(CAMERA_OPTIONS.FOV, CAMERA_OPTIONS.ASPECT, .1, 1000)
	const Scene = new THREE.Scene()

	// Controls
	const Orbit = new OrbitControls(Camera, Renderer.domElement)
	Orbit.enabled     = fLibrary.s_Circuit(RENDER_OPTIONS.Orbit_Enable, RENDER_Default.Orbit_Enable)
	Orbit.enablePan   = fLibrary.s_Circuit(RENDER_OPTIONS.enablePan, RENDER_Default.enablePan)
	Orbit.enableZoom  = fLibrary.s_Circuit(RENDER_OPTIONS.enableZoom, RENDER_Default.enableZoom)
	Orbit.maxZoom     = fLibrary.s_Circuit(RENDER_OPTIONS.maxZoom, RENDER_Default.maxZoom)
	Camera.position.z = fLibrary.s_Circuit(RENDER_OPTIONS.Camera_Z, RENDER_Default.Camera_Z)

	return {
		Renderer: Renderer,
		Camera:   Camera,
		Scene:    Scene,
		Orbit:    Orbit
	}
}