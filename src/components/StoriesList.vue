<template>
    <div id="stories-list">
        <transition-group name="stories-transition" tag="ul">
            <li v-for="story in sortedStories" class="list"
                :key="story.data.id">
                <StoryItem :story="story" />
            </li>
        </transition-group>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
    Getter,
    namespace,
} from "vuex-class";
import Component from "vue-class-component";
import { HackerNewsStoriesSorting } from "../api/index";
import { dispatchRefreshSortedStories } from "../store/modules/items";
import StoryItem from "./StoryItem.vue";

const ModuleGetter = namespace("items/", Getter);

/**
 * Displays a list of 'StoryItem' components.
 */
@Component({
    name: "stories-list",
    components: {
        StoryItem,
    },
})
export default class StoriesList extends Vue {
    @Getter("items/sortedStories") sortedStories: any;
    @ModuleGetter("items") moduleGetter: any;

    refresh() {
        dispatchRefreshSortedStories(this.$store, {
            limit: 20,
            sorting: HackerNewsStoriesSorting.Top,
        }).then((d) => console.log("refresh done") )
        .catch((reason) => console.log("StoriesList error : " + reason));
    }

    mounted() {
        this.refresh();
    }
}
</script>

<style scoped lang="stylus">
@import "~variables"

#stories-list
    position relative
    max-width 800px
    margin 0 auto

.list
    margin 30px 0
    width 100%
    list-style none
    ul
        padding 0
        margin 0

</style>
