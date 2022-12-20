<template>
    <Header/>
    <NameCard/>
</template>

<script>
import Header from './Header.vue'
import NameCard from './NameCard.vue'

// ThreeJS for WebGL utilization on the home screen
require('./WebGL')

export default {
    name: 'App',
    components: {
        Header,
        NameCard
    }
}
</script>

<style lang="sass">
    @use "../SASS/App.sass"
</style>