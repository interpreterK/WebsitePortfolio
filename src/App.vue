<template>
    <TopBar/>
    <NameCard/>
    <!--Vue Calls-->
</template>

<script>
import TopBar from './components/Header.vue'
import NameCard from './components/TopPage.vue'

// ThreeJS Home Page (Space)
import {ThreeJS_Graphics} from './components/WebGL/Space.js'
window.onload = ThreeJS_Graphics

export default {
    name: 'App',
    components: {
        TopBar,
        NameCard
    }
}
</script>

<style lang="sass">
    @use "./SASS/App.sass"
</style>