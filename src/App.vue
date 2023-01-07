<template>
    <TopBar/>
    <SpaceGL/>
    <MiddleGL/>
</template>

<script> 
import TopBar from './components/Header.vue'
import SpaceGL from './components/SpaceGL.vue'
import MiddleGL from './components/MiddleGL.vue'

// ThreeJS Home Page (Space)
import Render from './components/WebGL/Scenes/Space.js'
window.onload = Render

export default {
    name: 'App',
    components: {
        TopBar,
        SpaceGL,
        MiddleGL
    }
}
</script>

<style lang="sass">
    @use "./SASS/App.sass"
</style>