<template>
    <li class="story-item">
        <span class="score">{{ story.data.score }}</span>
        <span class="title">
            <span>
                <router-link :to="'/story/' + story.data.id">
                    {{ story.data.title }}
                </router-link>
                &nbsp;//&nbsp;
                <a :href="story.data.url" rel="noopener">
                    (source)
                </a>
            </span>
        </span>
        <br>
        <span class="meta">
            <span class="user-link">
                by&nbsp;
                <router-link :to="'/user/' + story.data.by">
                    {{ story.data.by }}
                </router-link>
                &nbsp;//&nbsp;
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
import { Prop } from "vue-property-decorator";
import { HackerNewsStory } from "../api/types";

/**
 * A compact Story entry in the 'StoriesList'.
 */
@Component({
    name: "story-item",
})
export default class StoryItem extends Vue {
    @Prop() story!: HackerNewsStory;
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
