import Vue from "vue";
import VueRouter from "vue-router";

import Story from "@/Story.vue";
import StoriesList from "@/StoriesList.vue";
import Error404 from "@/Error404.vue";
import { HackerNewsStoriesSorting } from "./api";

Vue.use(VueRouter);

export default new VueRouter({
    /*
     * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
     * it is only to be used only for websites.
     *
     * If you decide to go with "history" mode, please also open /config/index.js
     * and set "build.publicPath" to something other than an empty string.
     * Example: '/' instead of current ''
     *
     * If switching back to default "hash" mode, don't forget to set the
     * build publicPath back to '' so Cordova builds work again.
     */
    mode: "hash",
    routes: [
        { path: "/story/:id", component: Story },
        { path: "/top", component: StoriesList, props: {
            sorting: HackerNewsStoriesSorting.Top,
        } },
        { path: "/new", component: StoriesList, props: {
            sorting: HackerNewsStoriesSorting.Newest,
        } },
        { path: "/best", component: StoriesList, props: {
            sorting: HackerNewsStoriesSorting.Best,
        } },
        { path: "/", component: StoriesList },
        { path: "*", component: Error404 },
    ]
});
