<template>
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

<style scoped lang="stylus">
@import "~variables"

main
    text-align center
    margin 0
    background-color #eeeee3

.title
    h1
        margin 0
</style>
