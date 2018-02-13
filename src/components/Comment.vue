<template>
    <div class="comment">
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
        id: Number,
    }
})
export default class Comment extends Vue {
}
</script>

<style scoped lang="stylus">
@import "~variables"

</style>
