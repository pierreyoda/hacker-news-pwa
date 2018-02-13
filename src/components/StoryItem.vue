<template>
    <div class="story-item">
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

/**
 * A compact Story entry in the 'StoriesList'.
 */
@Component({
    name: "story-item",
})
export default class StoryItem extends Vue {
}
</script>

<style scoped lang="stylus">
@import "~variables"

</style>
