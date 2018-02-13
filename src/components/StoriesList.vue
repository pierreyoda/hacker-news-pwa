<template>
    <div id="stories-list">
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

/**
 * Displays a list of 'StoryItem' components.
 */
@Component({
    name: "stories-list",
})
export default class StoriesList extends Vue {
}
</script>

<style scoped lang="stylus">
@import "~variables"

</style>
