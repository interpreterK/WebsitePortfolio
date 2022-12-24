/*


	@Author: interpreterK (https://github.com/interpreterK)
*/

// Import ThreeJS
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const {
    PI:pi,
    cos,
    sin,
    random,
    floor,
    //min,
    //max
} = Math
//const Stars = []

function RandArbitrary(min, max) {
    return random()*(max-min)+min
}
function lerp(start, end, t) {
    return start*(1-t)+end*t
}
/*
function clamp(n1, n2, n3) {
    return max(n1, min(n2, n3))
}
function color_lerp(rgb_start, rgb_end, t) {
    // - Color Lerp -
    // RED_1_Start    BLUE_1_Start    GREEN_1_Start
    //     |±              |±               |±  ---- {0,lerp(...),255} ->{R:x_1,G:x_2,B:x_3}
    // RED_1_End      BLUE_1_End      GREEN_1_End
    const [R1,G1,B1] = [rgb_start[0], rgb_start[1], rgb_start[2]]
    const [R2,G2,B2] = [rgb_end[0],   rgb_end[1],   rgb_end[2]]
    return {
        r: clamp(0,lerp(R1, R2, t),255),
        g: clamp(0,lerp(G1, G2, t),255),
        b: clamp(0,lerp(B1, B2, t),255)
    }
}
*/
/*
async function flash_colorlerp(object) {
    for (let i = 0; i <= 100; i++) {
        await setTimeout(() => {

        }, 2000)
        await setTimeout(() => {
            
        }, 2000);
    }
}*/
function Show_TopPage() {
    // Show the top page at a certain period of time for the intro
    const TopPage = document.getElementById('CenterElement')
    setTimeout(() => {
        for (let i = 0; i <= 100; i++) {
            setTimeout(() => {
                TopPage.style.filter = `opacity(${i}%)`
            }, i*2)
        }
    }, 2000);
}

function ThreeJS_Graphics() {
    const WebGL_Div = document.getElementById('WebGL_Renderer')
    const w = WebGL_Div.offsetWidth
    const h = WebGL_Div.offsetHeight

    // Start WebGL renderer
    const Renderer = new THREE.WebGLRenderer({antialias: true})
    Renderer.setPixelRatio(window.devicePixelRatio)
    Renderer.setSize(w, h)
    document.body.appendChild(Renderer.domElement)

    // ThreeJS camera
    const Camera = new THREE.PerspectiveCamera(70, w/h, 0.1, 1000)
    const Scene = new THREE.Scene()

    // Setup the Scene Camera
    const Orbit       = new OrbitControls(Camera, Renderer.domElement)
    Orbit.enabled     = false
    Orbit.enablePan   = false
    Orbit.enableZoom  = false
    Orbit.maxZoom     = 10
    Camera.position.z = 2000

    // Functions
    function _3D_Sphere(SphereGeometry, Material_Color, Emissive) {
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

    function _3D_Box(BoxGeometry, Material_Color) {
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

    function Intro() {
        function easeOutQuad(x) {
            return 1-(1-x)*(1-x)
        }
        const Intervals = []

        for (let i = 0; i <= 100; i++) {
            Intervals[Intervals.length] = setInterval(() => {
                Camera.position.z = lerp(Camera.position.z, 100, easeOutQuad(i/2000))

                if (floor(Camera.position.z) <= 100) {
                    Intervals.forEach((_, index) => {
                        clearInterval(Intervals[index])
                    })
                    Orbit.enabled = true
                }
            }, 20*i)
        }
        Show_TopPage()
    }
    // - End Functions -

    // The main big planet
    _3D_Sphere([15*2, 32*2, 16*2])

    const Moon = _3D_Sphere([15/2, 32, 16])
    const Moon2 = _3D_Sphere([15/5, 32, 16])
    const Moon_Object = Moon.Mesh
    const Moon2_Object = Moon2.Mesh

    // Stars
    for (let i = 0; i < 1000; i++) {
        const Size = RandArbitrary(.1,2)
        const Star = _3D_Box([Size,Size,Size], 0xffffff).Mesh
        Star.position.set(
            RandArbitrary(-1000,1000),
            RandArbitrary(-1000,1000),
            RandArbitrary(-1000,1000),
        )
        Star.rotation.set(
            RandArbitrary(-360,360),
            RandArbitrary(-360,360),
            RandArbitrary(-360,360),
        )
    }

    Renderer.setAnimationLoop((deltaTime) => {
        const Angle1 = (deltaTime/(1e4*2)*pi)%(2*pi)
        const Angle2 = (deltaTime/4000*pi)%(2*pi)

        Moon_Object.position.x=sin(Angle1)*40
        Moon_Object.position.y=sin(Angle1)*35
        Moon_Object.position.z=cos(Angle1)*40
        Moon2_Object.position.x=Moon_Object.position.x+sin(Angle2)*10
        Moon2_Object.position.y=Moon_Object.position.y-sin(Angle2)*8
        Moon2_Object.position.z=Moon_Object.position.z+cos(Angle2)*10

        Renderer.render(Scene, Camera)
    })

    window.addEventListener('resize', () => {
        Camera.aspect = window.innerWidth/window.innerHeight
        Camera.updateProjectionMatrix()
        Renderer.setSize(window.innerWidth, window.innerHeight)
    }, false)

    Intro()
}

window.onload = ThreeJS_Graphics