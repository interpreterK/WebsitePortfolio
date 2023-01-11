import * as THREE from 'three'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'

let BLOOM_Default = {
    threshold: 0,
    strength:  2,
    radius:    0
}

export function _3D_Sphere(Scene, SphereGeometry, Material_Color, Emissive) {
    const Geometry = new THREE.SphereGeometry(...SphereGeometry)

    let Material
    if (Material_Color != undefined || Emissive != undefined) {
        Material = new THREE.MeshStandardMaterial({
            color: Material_Color === undefined ? 0xff0000 : Material_Color,
            emissive: Emissive === undefined ? 0xcccccc : Emissive
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
            color: Material_Color === undefined ? 0xff0000 : Material_Color
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

export function Bloom(Renderer, Scene, Camera, Bloom_Properties) {
    const Pass_Render = new RenderPass(Scene, Camera)
    const UnrealBloom = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,
        .4,
        .85
    )

    Bloom_Properties = Bloom_Properties === undefined ? BLOOM_Default : Bloom_Properties
    UnrealBloom.threshold = Bloom_Properties.threshold === undefined ? BLOOM_Default.threshold : Bloom_Properties.threshold
    UnrealBloom.strength  = Bloom_Properties.strength  === undefined ? BLOOM_Default.strength  : Bloom_Properties.strength
    UnrealBloom.radius    = Bloom_Properties.radius    === undefined ? BLOOM_Default.radius    : Bloom_Properties.radius

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