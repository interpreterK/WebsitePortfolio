<template>
    <!--Vue Calls-->
    <TopBar/>
    <NameCard/>
    <!---->

</template>

<script>
import TopBar from './components/Header.vue'
import NameCard from './components/TopPage.vue'

// ThreeJS Home Page (Space)
import Render from './components/WebGL/Space.js'
window.onload = Render

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