import Vue from "vue";
import Vuex from "vuex";

import { moduleItems, ItemsState } from "./modules/items";

Vue.use(Vuex);

export interface RootState {
    items: ItemsState,
}

export default new Vuex.Store({
    modules: {
        items: moduleItems,
    },
    strict: process.env.NODE_ENV !== "production",
});
