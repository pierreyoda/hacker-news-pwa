<template>
  <!-- Don't drop "q-app" class -->
    <div id="q-app">
        <main>
            <div class="title">
                <h1>Simple Hacker News Reader</h1>
            </div>
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
