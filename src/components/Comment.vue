<template>
    <div class="comment" v-if="comment">
        <div class="by" v-if="!comment.collapsed">
            <router-link :to="'/user/' + comment.data.by">
                {{ comment.data.by }}
            </router-link>
            <span class="timedelta">
                {{ comment.data.time | timeAgo }} ago
            </span>
        </div>
        <div class="text">
            <p v-html="comment.data.text"></p>
        </div>
        <div class="toggle" :class="{ open: !comment.collapsed }"
            v-if="comment.data.kids && comment.data.kids.length">
            <a @click="toggleCollapse">
                {{
                    comment.collapsed ? `[+] ${repliesCounter}` : "[-]"
                }}
            </a>
        </div>
        <ul class="children" v-show="!comment.collapsed">
            <li v-for="kidId in comment.data.kids" :key="kidId">
                <comment :comment="comments[kidId]" />
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
import { Prop } from "vue-property-decorator";
import {
    Comment as CommentStoreData,
    CommentsRecord,
    commitToggleCommentCollapsed
} from "../store/modules/items";
import { pluralize } from "../utils";

/**
 * A single comment on a Hacker News 'Story'.
 */
@Component({
    name: "comment",
})
export default class Comment extends Vue {
    @Prop() comment!: CommentStoreData;

    @Getter("items/comments") comments!: CommentsRecord;

    get repliesCounter() {
        const kids = this.$props.comment.data.kids;
        return `${kids.length} ${pluralize(kids, "reply", "replies")} collapsed`;
    }

    toggleCollapse() {
        commitToggleCommentCollapsed(this.$store, this.$props.comment.data.id);
    }
}
</script>

<style scoped lang="stylus">
@import "~variables"

li

.toggle
    float left
    padding .3em .5em
    border-radius 4px
    &.open
        padding 0
        margin-bottom -0.5em
    a
        color $secondary
        cursor pointer

.by, .text
    text-align left
    font-size 0.9em
    margin 1em 0
.by
    color $tertiary
    a
        text-decoration underline
</style>
