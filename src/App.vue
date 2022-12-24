<template>
    <Header/>
    <NameCard/>
</template>

<script>
import Header from './components/Header.vue'
import NameCard from './components/TopPage.vue'

// ThreeJS for WebGL utilization on the home screen
require('./components/WebGL/Space')

export default {
    name: 'App',
    components: {
        Header,
        NameCard
    }
}
</script>

<style lang="sass">
    @use "./SASS/App.sass"
</style>