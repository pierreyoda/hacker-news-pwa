import * as vuex from "vuex";
import { getStoreAccessors } from "vuex-typescript";

import {
    fetchStory,
    fetchStoriesIDs,
    HackerNewsStoriesSorting,
} from "../../api";
import { HackerNewsStory } from "../../api/types";
import { RootState } from "../index";

// State
export interface Story {
    data: HackerNewsStory,
    visible: boolean,
}

export interface ItemsState {
    sortedStories: Story[],
}

const initialState = {
    sortedStories: [],
}

// Context
type ItemsContext = vuex.ActionContext<ItemsState, RootState>;

// Getters
const getters = {
    sortedStories: (state: ItemsState): Story[] => state.sortedStories,
};

// Actions
const actions = {
    async refreshSortedStories(context: ItemsContext,
            options: {
                limit: number,
                sorting: HackerNewsStoriesSorting,
            }) {
        if (!Number.isInteger(options.limit) || options.limit < 0)
            throw new RangeError(`items store : invalid limit
                \"${options.limit}\" in getStories.`);
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
export const dispatchRefreshSortedStories = dispatch(actions.refreshSortedStories);
export const commitSetSortedStories = commit(mutations.setSortedStories);
export const commitClearSortedStories = commit(mutations.clearSortedStories);

export const moduleItems = {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations,
};
