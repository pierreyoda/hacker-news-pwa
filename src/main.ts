require(`./themes/app.${__THEME}.styl`);

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from "vue";
import Quasar from "quasar";

import router from "./router";
import store from "./store/index";
import App from "./App.vue";

Vue.use(Quasar);

if (__THEME === "mat") {
    require('quasar-extras/roboto-font');
}
import "quasar-extras/material-icons";
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

Quasar.start(() => {
    // tslint:disable-next-line:no-unused-expression
    new Vue({
        el: "#q-app",
        render: (h) => h(App),
        router,
        store,
    });
});
