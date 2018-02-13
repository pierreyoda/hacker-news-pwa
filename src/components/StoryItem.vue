<template>
    <li class="story-item">
        <span class="score">{{ story.data.score }}</span>
        <span class="title">
            <span>
                <a :href="story.data.url" rel="noopener">
                    {{ story.data.title }}
                </a>
            </span>
        </span>
        <br>
        <span class="meta">
            <span class="user-link">
                by {{ story.data.by }} //&nbsp;
            </span>
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

$item-height = 20px

.story-item
    position relative
    background-color #ffffff
    padding 20px 15px 20px 15px
    border-bottom 1px solid $tertiary
    line-height $item-height

    a
        color $secondary
        text-decoration underline

    .score
        color $primary
        font-size 1.2em
        font-weight 800
        position absolute
        top 50%
        left 0
        width 80px
        text-align center
        margin-top -0.5px * $item-height
</style>
