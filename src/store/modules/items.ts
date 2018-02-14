import * as vuex from "vuex";
import { getStoreAccessors } from "vuex-typescript";

import {
    fetchStory,
    fetchStoriesIDs,
    HackerNewsStoriesSorting,
    fetchComment,
} from "../../api";
import {
    HackerNewsItem,
    HackerNewsStory,
    HackerNewsComment,
} from "../../api/types";
import { RootState } from "../index";

// State
export interface Story {
    data: HackerNewsStory,
    visible: boolean,
}
export interface Comment {
    data: HackerNewsComment,

}

export interface ItemsState {
    current: HackerNewsItem,
    sortedComments: Comment[],
    sortedStories: Story[],
}

const initialState = {
    current: {},
    sortedComments: [],
    sortedStories: [],
}

// Context
type ItemsContext = vuex.ActionContext<ItemsState, RootState>;

// Getters
const getters = {
    current: (state: ItemsState) => state.current,
    sortedComments: (state: ItemsState) => state.sortedComments,
    sortedStories: (state: ItemsState): Story[] => state.sortedStories,
};

// Actions
const actions = {
    async getStory(context: ItemsContext, id: number) {
        if (!Number.isInteger(id) || id < 0)
            throw new RangeError(`items store : invalid ID
                \"${id}\" in action getStory.`);

        const storyData: HackerNewsStory = await fetchStory(id);

        // retrieve comments
        const commentsIDs: number[] = storyData.kids;
        const fetch = (id: number) => fetchComment(id);
        Promise.all(commentsIDs.map(fetch))
            .then((commentsData) => {
                const comments = commentsData.map((data) => {
                    return {
                        data,
                        collapsed: false,
                    };
                });
                commitSetSortedComments(context, comments);
            }).catch((reason) =>
                console.log("store error in items : " + reason)
            );
        commitSetCurrentItem(context, storyData);
    },

    async refreshSortedStories(context: ItemsContext,
            options: {
                limit: number,
                sorting: HackerNewsStoriesSorting,
            }) {
        if (!Number.isInteger(options.limit) || options.limit < 0)
            throw new RangeError(`items store : invalid limit
                \"${options.limit}\" in action refreshSortedStories.`);
        const ids = await fetchStoriesIDs(options.sorting);
        const storiesIDs: number[] = [];
        for (let i = 0; i < options.limit; i++) {
            storiesIDs.push(ids[i]);
        }
        const fetch = (id: number) => fetchStory(id);
        Promise.all(storiesIDs.map(fetch))
            .then((stories) => {
                commitSetSortedStories(context, stories.map(data => {
                    return {
                        data,
                        visible: true,
                    };
                }));
            }).catch((reason) =>
                console.log("store error in items : " + reason)
        );
    },
};

// Mutations
const mutations = {
    setCurrentItem(state: ItemsState, item: HackerNewsItem) {
        state.current = item;
    },

    setSortedComments(state: ItemsState, comments: Comment[]) {
        state.sortedComments = comments;
    },
    setSortedStories(state: ItemsState, stories: Story[]) {
        state.sortedStories = stories;
    },

    clearSortedStories(state: ItemsState) {
        state.sortedStories = [];
    }
};

// Methods
const { read, dispatch, commit } = getStoreAccessors<ItemsState, RootState>("items");

export const readSortedStories = read(getters.sortedStories);
export const dispatchGetStory = dispatch(actions.getStory);
export const dispatchRefreshSortedStories = dispatch(actions.refreshSortedStories);
export const commitSetCurrentItem = commit(mutations.setCurrentItem);
export const commitSetSortedStories = commit(mutations.setSortedStories);
export const commitSetSortedComments = commit(mutations.setSortedComments);
export const commitClearSortedStories = commit(mutations.clearSortedStories);

export const moduleItems = {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations,
};
