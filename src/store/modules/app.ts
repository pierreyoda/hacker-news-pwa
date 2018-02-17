import * as vuex from "vuex";
import { getStoreAccessors } from "vuex-typescript";

import { RootState } from "../index";

// State
export interface AppState {
    layoutTabsVisible: boolean,
}

const initialState = {
    layoutTabsVisible: true,
};

// Context
type AppContext = vuex.ActionContext<AppState, RootState>;

// Getters
const getters = {
    tabsVisible: (state: AppState) => state.layoutTabsVisible,
};

// Actions
const actions = {
};

// Mutations
const mutations = {
    setTabsVisible(state: AppState, visible: boolean) {
        state.layoutTabsVisible = visible;
    },
};

// Methods
const { dispatch, commit } = getStoreAccessors<AppState, RootState>("app");

export const commitSetTabsVisible = commit(mutations.setTabsVisible);

export const moduleApp = {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations,
};
