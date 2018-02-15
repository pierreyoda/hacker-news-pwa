import * as vuex from "vuex";
import { getStoreAccessors } from "vuex-typescript";

import {
    HackerNewsStoriesSorting,
    fetchStory,
    fetchStoriesIDs,
    fetchItemComments,
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
    collapsed: boolean,
}

type CommentsRecord = Record<string, Comment>;

export interface ItemsState {
    current: HackerNewsItem,
    comments: CommentsRecord,
    sortedStories: Story[],
}

const initialState = {
    current: {},
    comments: {},
    sortedStories: [],
}

// Context
type ItemsContext = vuex.ActionContext<ItemsState, RootState>;

// Getters
const getters = {
    current: (state: ItemsState) => state.current,
    comments: (state: ItemsState) => state.comments,
    sortedStories: (state: ItemsState): Story[] => state.sortedStories,
};

// Actions
const actions = {
    async getStory(context: ItemsContext, id: number) {
        if (!Number.isInteger(id) || id < 0)
            throw new RangeError(`items store : invalid story ID
                \"${id}\" in action getStory.`);

        try {
            const storyData: HackerNewsStory = await fetchStory(id);
            const commentsData = await fetchItemComments(storyData.kids);

            let comments: CommentsRecord = {};
            commentsData.forEach((data) =>
                comments[data.id] = {
                    data,
                    collapsed: false,
                }
            );
            commitSetCurrentItem(context, storyData);
            commitSetComments(context, comments);
        } catch (error) {
            console.log(`items store error in action getStory : ${error}`);
        }
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

    toggleCommentCollapsed(state: ItemsState, id: number) {
        const comment = state.comments[id];
        if (comment == undefined) {
            console.log(`store error in items : cannot find comment with ID
                         "${id}" cannot be found in action toggleCommentCollapsed.`);
            return;
        }
        comment.collapsed = !comment.collapsed;
    },

    setComments(state: ItemsState, comments: CommentsRecord) {
        state.comments = comments;
    },

    setSortedStories(state: ItemsState, stories: Story[]) {
        state.sortedStories = stories;
    },
    clearSortedStories(state: ItemsState) {
        state.sortedStories = [];
    }
};

// Methods
const { dispatch, commit } = getStoreAccessors<ItemsState, RootState>("items");

export const dispatchGetStory = dispatch(actions.getStory);
export const dispatchRefreshSortedStories = dispatch(actions.refreshSortedStories);
export const commitSetCurrentItem = commit(mutations.setCurrentItem);
export const commitToggleCommentCollapsed = commit(mutations.toggleCommentCollapsed);
export const commitSetSortedStories = commit(mutations.setSortedStories);
export const commitSetComments = commit(mutations.setComments);
export const commitClearSortedStories = commit(mutations.clearSortedStories);

export const moduleItems = {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations,
};
