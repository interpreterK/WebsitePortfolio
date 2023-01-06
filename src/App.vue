<template>
    <TopBar/>
    <div id="WebGL_Renderer">
        <div id="Top-Window">
            <div class="Top-Bar-Window">
                <button id="Close-Prompt">X</button>
                <h1>Hello!</h1>
            </div>
        </div>
    </div>
    <div class="MiddlePage">
        
    </div>
</template>

<script>
import TopBar from './components/Header.vue'

// ThreeJS Home Page (Space)
import Render from './components/WebGL/Space.js'
window.onload = Render

export default {
    name: 'App',
    components: {
        TopBar,
    }
}
</script>

<style lang="sass">
    @use "./SASS/App.sass"
</style>