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
import { Getter } from "vuex-class";
import { Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import { HackerNewsStoriesSorting } from "../api/index";
import { dispatchRefreshSortedStories } from "../store/modules/items";
import StoryItem from "./StoryItem.vue";

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
    @Prop({default: HackerNewsStoriesSorting.Top})
    sorting!: HackerNewsStoriesSorting;

    @Getter("items/sortedStories") sortedStories: any;

    @Watch("$route")
    onRouteChanged() {
        this.refresh();
    }

    mounted() {
        this.refresh();
    }

    refresh() {
        dispatchRefreshSortedStories(this.$store, {
            limit: 10,
            sorting: this.$props.sorting,
        }).catch((reason: any) => console.log("StoriesList error : " + reason));
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
    margin 30px
    width 100%
    list-style none
    ul
        padding 0
        margin 0

</style>
