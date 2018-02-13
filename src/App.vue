<template>
  <!-- Don't drop "q-app" class -->
    <div id="q-app">
        <header>Simple Hacker News Reader</header>
        <main>
            <img src="~assets/quasar-logo-full.svg" alt="Quasar PWA">
            <router-view></router-view>
        </main>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

/*
 * Root component
 */
@Component({
    name: "app",
})
export default class App extends Vue {
}
</script>

<style lang="stylus">
@import "~variables"

main
    text-align center
    margin-top 40px
    background-color #eeeee3

header
    margin 0;
    height 10px;
    background-color $primary
</style>
