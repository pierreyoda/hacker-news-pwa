<template>
<div class="story">
    <div class="header">
        <div class="title">
            <a :href="currentStory.url" rel="noopener">
                <h1>{{ currentStory.title }}</h1>
            </a>
            <span class="host">
                ({{ currentStory.url | host }})
            </span>
        </div>
        <div class="meta">
            <span class="score">
                {{ currentStory.score }} points
            </span>
            <span class="by">
                | by
                <router-link :to="'/user/' + currentStory.by">
                    {{ currentStory.by }}
                </router-link>
            </span>
            <span class="timedelta">
                {{ currentStory.time | timeAgo }} ago
            </span>
        </div>
    </div>
    <div class="comments">
        <span class="count">
            {{ currentStory.descendants }} comments
        </span>
        <transition-group name="comments-transition" tag="ul">
            <li v-for="commentId in currentStory.kids" class="list"
                :key="commentId">
                <!-- {{ comments.length }} -->
                <Comment :comment="comments[commentId]" />
            </li>
        </transition-group>
    </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
import { HackerNewsStory } from "../api/types";
import { CommentsRecord, dispatchGetStory } from "../store/modules/items";
import Comment from "./Comment.vue";

/**
 * Displays an Hacker News Story with its title, link to the article,
 * score and comments.
 */
@Component({
    name: "story",
    components: {
        Comment,
    },
})
export default class Article extends Vue {
    @Getter("items/current") currentStory!: HackerNewsStory;
    @Getter("items/comments") comments!: CommentsRecord;

    refresh() {
        const id = Number.parseInt(this.$route.params.id);
        dispatchGetStory(this.$store, id)
            .catch((reason: any) => console.log("Story error : " + reason));
    }

    mounted() {
        this.refresh();
    }
}
</script>

<style scoped lang="stylus">
@import "~variables"

.story
    background-color #ffffff

.header
    background-color #ffffff
    padding 2em 1em 2em 1em
    .title h1
        display inline
        color $primary
        font-size 2.0em
        font-weight 500
        margin 0 0.5em 0 0
    .host, .meta
        color $secondary
    .meta a
        text-decoration underline

.meta
    .score
        color $primary
        font-size 1.1em
        font-weight 800

.comments
    .list
        list-style none

</style>
