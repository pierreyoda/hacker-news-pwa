import Default from "../layouts/default.vue";
import Index from "../pages/index.vue";
import Error404 from "../pages/404.vue";

export default [
    {
        path: "/",
        component: Default,
        children: [{ path: "", component: Index }],
    },

    {
        path: "*",
        component: Error404,
    }
];
