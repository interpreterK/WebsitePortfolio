<template>
    <!--Vue Imports-->
    <TopBar/>
    <TopPage/>
    <MiddlePage/>
    <!---->
    
</template>

<script>
import TopBar from './components/Header.vue'
import TopPage from './components/TopPage.vue'
import MiddlePage from './components/MiddlePage.vue'

// ThreeJS Home Page (Space)
import Render from './components/WebGL/Space.js'
window.onload = Render

export default {
    name: 'App',
    components: {
        TopBar,
        TopPage,
        MiddlePage
    }
}
</script>

<style lang="sass">
    @use "./SASS/App.sass"
</style>