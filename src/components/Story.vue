<template>
    <div class="story">
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

/**
 * Displays an Hacker News Story with its title, link to the article,
 * score and comments.
 */
@Component({
    name: "story",
})
export default class Article extends Vue {
}
</script>

<style scoped lang="stylus">
@import "~variables"

</style>
