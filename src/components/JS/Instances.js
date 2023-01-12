import * as THREE from 'three'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import * as fLibrary from './fLibrary.js'

let BLOOM_Default = {
    threshold: 0,
    strength:  2,
    radius:    0
}

export function _3D_Sphere(Scene, SphereGeometry, Material_Color, Emissive) {
    const Geometry = new THREE.SphereGeometry(...SphereGeometry)

    let Material
    if (Material_Color != undefined || Emissive != undefined) {
        Material = new THREE.MeshBasicMaterial({
            color: fLibrary.s_Circuit(Material_Color, 0xff0000)
        })
    } else {
        Material = new THREE.MeshNormalMaterial()
    }

    const Mesh = new THREE.Mesh(Geometry, Material)
    Scene.add(Mesh)

    return {
        Geometry: Geometry,
        Material: Material,
        Mesh: Mesh
    }
}

export function _3D_Box(Scene, BoxGeometry, Material_Color) {
    const Geometry = new THREE.BoxGeometry(...BoxGeometry)
    
    let Material
    if (Material_Color != undefined) {
        Material = new THREE.MeshBasicMaterial({
            color: fLibrary.s_Circuit(Material_Color, 0xff0000)
        })
    } else {
        Material = new THREE.MeshNormalMaterial()
    }

    const Mesh = new THREE.Mesh(Geometry, Material)
    Scene.add(Mesh)

    return {
        Geometry: Geometry,
        Material: Material,
        Mesh: Mesh
    }
}

export function Bloom(Renderer, Scene, Camera, BLOOM_Properties) {
    const Pass_Render = new RenderPass(Scene, Camera)
    const UnrealBloom = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,
        .4,
        .85
    )

    BLOOM_Properties      = fLibrary.s_Circuit(BLOOM_Properties, BLOOM_Default)
    UnrealBloom.threshold = fLibrary.s_Circuit(BLOOM_Properties.threshold, BLOOM_Default.threshold)
    UnrealBloom.strength  = fLibrary.s_Circuit(BLOOM_Properties.strength, BLOOM_Default.strength)
    UnrealBloom.radius    = fLibrary.s_Circuit(BLOOM_Properties.radius, BLOOM_Default.radius)

    const Composer = new EffectComposer(Renderer)
    Composer.setSize(window.innerWidth, window.innerHeight)
    Composer.renderToScreen = true
    Composer.addPass(Pass_Render)
    Composer.addPass(UnrealBloom)

    return {
        Pass_Render: Pass_Render,
        UnrealBloom: UnrealBloom,
        Composer: Composer
    }
}