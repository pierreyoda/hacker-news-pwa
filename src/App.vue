<template>
    <q-layout ref="layout">
        <q-toolbar slot="header">
            <q-btn flat @click="$refs.layout.toggleLeft()">
                <q-icon name="menu" />
            </q-btn>
            <q-toolbar-title>
                Hacker News
                <span slot="subtitle">Simple PWA Reader</span>
            </q-toolbar-title>
        </q-toolbar>

        <q-tabs slot="navigation" v-if="layoutTabsVisible">
            <q-route-tab slot="title" to="/top" replace label="Top stories" />
            <q-route-tab slot="title" to="/new" replace label="Newest stories" />
            <q-route-tab slot="title" to="/best" replace label="Best stories" />
        </q-tabs>

        <q-scroll-area slot="left" class="panel">
            <q-list-header>Left Panel</q-list-header>
            <q-side-link item to="/">
                <q-item-side icon="home" />
                <q-item-main label="Home" sublabel="Hacker News Stories" />
            </q-side-link>
            <q-side-link item to="/settings">
                <q-item-side icon="settings" />
                <q-item-main label="Settings" />
            </q-side-link>
        </q-scroll-area>

        <main>
            <router-view></router-view>
        </main>
    </q-layout>
</template>

<script lang="ts">
import Vue from "vue";
import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QTabs,
    QRouteTab,
    QScrollArea,
    QListHeader,
    QSideLink,
    QItemMain,
    QItemSide,
    QBtn,
    QIcon,
} from "quasar";
import { Getter } from "vuex-class";
import Component from "vue-class-component";

/*
 * Root component
 */
@Component({
    name: "app",
    components: {
        QLayout,
        QToolbar,
        QToolbarTitle,
        QTabs,
        QRouteTab,
        QScrollArea,
        QListHeader,
        QSideLink,
        QItemMain,
        QItemSide,
        QBtn,
        QIcon,
    }
})
export default class App extends Vue {
    @Getter("app/tabsVisible") layoutTabsVisible: any;
}
</script>

<style scoped lang="stylus">
@import "~variables"

.panel
    width 100%
    height 100%

main
    text-align center
    max-width $mainMaxWidth
    margin 20px auto 0
    background-color #eeeee3
</style>
