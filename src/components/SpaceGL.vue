<template>
	<div id="WebGL_Renderer"></div>
    <div id="Top-Window">
        <div class="Top-Bar-Window">
            <button id="Close-Prompt">X</button>
        </div>
        <div class="gh-calendar">   
             <!-- Loading stuff -->
             Loading the data just for you.
        </div>
    </div>
</template>

<script>
import * as github_calendar from 'github-calendar'

github_calendar('#WebGL_Renderer', "interpreterK")

export default {
	name: 'SpaceGL'
}
</script>

<style lang="sass" scoped>
	@use "../SASS/SpaceGL.sass"
</style>