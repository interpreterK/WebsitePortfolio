<template>
    <Header/>
    <NameCard/>
</template>

<script>
import Header from './components/Header.vue'
import NameCard from './components/NameCard.vue'

// ThreeJS for WebGL utilization on the home screen
require('./components/WebGL')

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