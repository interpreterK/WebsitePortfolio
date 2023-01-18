<template>
    <TopBar/>
    <SpaceGL/>
</template>

<script> 
import TopBar from './components/Header.vue'
import SpaceGL from './components/SpaceGL.vue'

// ThreeJS Home Page (Space)
import Render from './components/JS/Scenes/Space.js'
window.onload = Render

export default {
    name: 'App',
    components: {
        TopBar,
        SpaceGL
    }
}
</script>

<style lang="sass">
    @use "./SASS/App.sass"
</style>