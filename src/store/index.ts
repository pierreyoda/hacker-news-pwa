import Vue from "vue";
import Vuex from "vuex";

import { moduleArticles } from "./modules/articles";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        articles: moduleArticles,
    },
    strict: process.env.NODE_ENV !== "production"
});
