import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// Defaulted values, ignore.
const Orbit_Enable = false
const Pan_Enable   = false
const Zoom_Enable  = false
const Max_Zoom     = 10
const Camera_Z     = 2000

export default function WebGL_New(RENDER_DIV, RENDER_OPTIONS) {
	const W = RENDER_DIV.offsetWidth
	const H = RENDER_DIV.offsetHeight

	// Start WebGL
	const Renderer = new THREE.WebGLRenderer({antialias: true})
	Renderer.setPixelRatio(window.devicePixelRatio)
	Renderer.setSize(W, H)
	RENDER_DIV.appendChild(Renderer.domElement)

	// Create the virtual camera
	const Camera = new THREE.PerspectiveCamera(70, W/H, .1, 1000)
	const Scene = new THREE.Scene()

	// Controls
	RENDER_OPTIONS = RENDER_OPTIONS === undefined ? {} : RENDER_OPTIONS
	
	const Orbit = new OrbitControls(Camera, Renderer.domElement)
	Orbit.enabled     = RENDER_OPTIONS.Orbit_Enable === undefined ? Orbit_Enable : RENDER_OPTIONS.Orbit_Enable
	Orbit.enablePan   = RENDER_OPTIONS.Pan_Enable   === undefined ? Pan_Enable   : RENDER_OPTIONS.Pan_Enable
	Orbit.enableZoom  = RENDER_OPTIONS.Zoom_Enable  === undefined ? Zoom_Enable  : RENDER_OPTIONS.Zoom_Enable
	Orbit.maxZoom     = RENDER_OPTIONS.Max_Zoom     === undefined ? Max_Zoom     : RENDER_OPTIONS.Max_Zoom
	Camera.position.z = RENDER_OPTIONS.Camera_Z     === undefined ? Camera_Z     : RENDER_OPTIONS.Camera_Z

	return {
		Renderer: Renderer,
		Camera:   Camera,
		Scene:    Scene,
		Orbit:    Orbit
	}
}