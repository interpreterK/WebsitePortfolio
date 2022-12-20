<template>
    <Header/>
</template>

<script>
import Header from './Header.vue'

// ThreeJS for WebGL utilization on the home screen
require('./WebGL')

export default {
    name: 'App',
    components: {
        Header
    }
}
</script>

<style lang="sass">
    @use "./SASS/App.sass"
</style>