/*


	@Author: interpreterK (https://github.com/interpreterK)
*/

// Import ThreeJS
import * as THREE from 'three'

function ThreeJS_Graphics() {
    // Start WebGL renderer
    const Renderer = new THREE.WebGLRenderer({antialias: true})
    Renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(Renderer.domElement)

    // ThreeJS camera
    const Camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000)
    const Scene = new THREE.Scene()

    // Setup the Scene Camera
    Camera.position.set(-25,-15,60)

    // Functions
    function _3D_Sphere(BoxGeometry) {
        const Geometry = new THREE.SphereGeometry(...BoxGeometry)
        const Material = new THREE.MeshNormalMaterial()
        const Mesh = new THREE.Mesh(Geometry, Material)

        return {
            Geometry: Geometry,
            Material: Material,
            Mesh: Mesh
        }
    }

    /*
    function _3D_DirectionalLight() {

    }
    */
    // - End Functions -

    const Main_Planet = _3D_Sphere([15, 32, 16])
    const Main_Planet_Object = Main_Planet.Mesh

    Scene.add(Main_Planet_Object)
    Renderer.render(Scene, Camera);

    window.addEventListener('resize', () => {
        Camera.aspect = window.innerWidth/window.innerHeight
        Camera.updateProjectionMatrix()
        Renderer.setSize(window.innerWidth, window.innerHeight)
    }, false)
}

window.onload = ThreeJS_Graphics