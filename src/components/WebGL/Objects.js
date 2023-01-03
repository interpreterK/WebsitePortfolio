import * as THREE from 'three'

export function _3D_Sphere(Scene, SphereGeometry, Material_Color, Emissive) {
    const Geometry = new THREE.SphereGeometry(...SphereGeometry)

    let Material
    if (Material_Color != undefined || Emissive != undefined) {
        Material = new THREE.MeshStandardMaterial({
            color: Material_Color === undefined ? 0xff0000 : Material_Color,
            emissive: Emissive === undefined ? 0x404040 : Emissive
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