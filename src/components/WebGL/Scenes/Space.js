/*
	@Author: interpreterK (https://github.com/interpreterK)
*/

import * as cMath from '../cMath.js'
import * as Instances from '../Instances.js'
import WebGL_Scene from '../WebGL_Scene.js'

const {PI:pi,cos,sin,floor} = Math

function Intro(Camera, Orbit, FadeWindow) {
    const CloseWindow = document.getElementById("Close-Prompt")
    const Intervals = []

    for (let i = 0; i <= 100; i++) {
        Intervals[Intervals.length] = setInterval(() => {
            Camera.position.z = cMath.lerp(Camera.position.z, 100, cMath.easeOutQuad(i/2000))

            if (floor(Camera.position.z) <= 100) {
                Intervals.forEach((_, index) => {
                    clearInterval(Intervals[index])
                })
                Orbit.enabled = true
            }
        }, 20*i)
    }
    //cMath.FadeIn(FadeWindow)
    CloseWindow.onclick = function() {
        cMath.FadeOut(FadeWindow)
    }
}

export default function Render() {
    const TopWindow = document.getElementById("Top-Window")
    const WebGL_Div = document.getElementById('WebGL_Renderer')

    const WebGL    = WebGL_Scene(WebGL_Div)
    const Renderer = WebGL.Renderer
    const Camera   = WebGL.Camera
    const Orbit    = WebGL.Orbit
    const Scene    = WebGL.Scene

    // The main big planet
    Objects._3D_Sphere(Scene, [15*2, 32*2, 16*2])

    const Moon = Objects._3D_Sphere(Scene, [15/2, 32, 16])
    const Moon2 = Objects._3D_Sphere(Scene, [15/5, 32, 16])
    const Moon_Object = Moon.Mesh
    const Moon2_Object = Moon2.Mesh

    // Stars and Particles
    const Particles = []
    
    for (let i = 0; i < 1000; i++) {
        const Size = cMath.RandArbitrary(.1,2)
        const Star = Objects._3D_Box(Scene, [Size,Size,Size], 0xffffff).Mesh
        // Randomly set a position and rotation
        // Space atmosphere
        Star.position.x=cMath.RandArbitrary(-1000,1000)
        Star.position.y=cMath.RandArbitrary(-1000,1000)
        Star.position.z=cMath.RandArbitrary(-1000,1000)
        Star.rotation.x=cMath.RandArbitrary(-360,360)
        Star.rotation.y=cMath.RandArbitrary(-360,360)
        Star.rotation.z=cMath.RandArbitrary(-360,360)
    }
    for (let i = 0; i < 500; i++) {
        const Particle = Objects._3D_Sphere(Scene, [15/50, 32, 16]).Mesh
        Particles[Particles.length] = {
            Object: Particle,
            Origin: Particle.position
        }
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

        Particles.forEach((_, index) => {
            const Particle = Particles[index]
            // Particle.Object.position.y=Particle.Origin.y+cos(Angle1)/10
            // Particle.Object.position.x=(Particle.Origin.x-(index/300))+sin(Angle1)/100
            // Particle.Object.position.y=(Particle.Origin.y-(index/500))+sin(Angle2)/500
            // Particle.Object.position.x=(Particle.Origin.x-(index/500))+sin(Angle1)/500
            // Particle.Object.position.z=(Particle.Origin.z+(index/500))+cos(Angle1/(500/4))/500
            // Particle.Object.position.x=(Particle.Origin.x-(index/500))+cos(Angle1/(500/4))/500
            // Particle.Object.position.y=(Particle.Origin.y+(index/500))+cos(Angle1/(500/4))/500

            Particle.Object.position.x=sin(Angle1+index)*50
            Particle.Object.position.y=sin(Angle1+index)*50
            Particle.Object.position.z=cos(Angle1+index)*60

        })

        Renderer.render(Scene, Camera)
    })

    window.addEventListener("resize", () => {
        Camera.aspect = window.innerWidth/window.innerHeight
        Camera.updateProjectionMatrix()
        Renderer.setSize(window.innerWidth, window.innerHeight)
    }, false)

    Intro(Camera, Orbit, TopWindow)
}