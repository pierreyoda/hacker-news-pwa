import Vue from "vue";
import Vuex from "vuex";

import { moduleApp, AppState } from "./modules/app";
import { moduleItems, ItemsState } from "./modules/items";

Vue.use(Vuex);

export interface RootState {
    app: AppState,
    items: ItemsState,
}

export default new Vuex.Store({
    modules: {
        app: moduleApp,
        items: moduleItems,
    },
    strict: process.env.NODE_ENV !== "production",
});
