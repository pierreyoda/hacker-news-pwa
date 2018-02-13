<template>
    <li class="story-item">
        <span class="score">{{ story.score }}</span>
        <span class="title">
            <span>{{ story.data.title }} // </span>
            <span>{{ story.data.url }} // </span>
        </span>
        <span class="meta">
            <span class="comments-link">
                {{ story.data.descendants }} comments
            </span>
        </span>
    </li>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

/**
 * A compact Story entry in the 'StoriesList'.
 */
@Component({
    name: "story-item",
    props: {
        story: {},
    }
})
export default class StoryItem extends Vue {
}
</script>

<style scoped lang="stylus">
@import "~variables"

</style>
