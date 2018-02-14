<template>
    <div class="story">
        <router-link :to="'/'">Back</router-link>
        <br>
        <div class="title">
             {{ currentStory.title }}
        </div>
        <div class="by">
            by
            <router-link :to="'/user/' + currentStory.by">
                {{ currentStory.by }}
            </router-link>
        </div>
        <div class="comments">
            <span class="count">
                {{ currentStory.descendants }} comments
            </span>
            <transition-group name="comments-transition" tag="ul">
                <li v-for="comment in sortedComments" class="list"
                    :key="comment.data.id">
                    <Comment :comment="comment" />
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {
    Getter,
    namespace,
} from "vuex-class";
import { dispatchGetStory } from "../store/modules/items";
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
    @Getter("items/current") currentStory: any;
    @Getter("items/sortedComments") sortedComments: any;

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

</style>
