<template>
    <TopBar/>
    <NameCard/>
    <!--Vue Calls-->
</template>

<script>
import TopBar from './components/Header.vue'
import NameCard from './components/TopPage.vue'

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