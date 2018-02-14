<template>
    <div class="comment">
        <div class="by">
            by&nbsp;
            <router-link :to="'/user/' + comment.data.by">
                {{ comment.data.by }}
            </router-link>
            &nbsp;//&nbsp;
            <span class="timedelta">
                {{ timeAgo }} ago
            </span>
        </div>
        <div class="text">
            <p v-html="comment.data.text"></p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

/**
 * A single comment on a Hacker News 'Story'.
 */
@Component({
    name: "comment",
    props: {
        comment: {},
    }
})
export default class Comment extends Vue {
    get timeAgo() {
        const time = this.$props.comment.data.time;
        return Date.now() - time; // TODO
    }
}
</script>

<style scoped lang="stylus">
@import "~variables"

.comment
    .by, .text
        font-size 0.9em
        margin 1em 0

</style>
