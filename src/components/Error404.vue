<template>
<div class="error-page">
    <div class="error-code">
        Error 404
    </div>
    <div class="error-card">
        <q-icon name="error_outline" color="grey-5" />
        <p class="caption">Oops. Nothing here...</p>
        <p class="actions">
            <q-btn
                v-if="canGoBack"
                @click="goBack"
                color="primary"
                push
                icon="keyboard_arrow_left"
            >
                Go back
            </q-btn>
            <q-btn
                color="secondary"
                push
                @click="$router.replace('/')"
                icon-right="home"
            >
                Go home
            </q-btn>
        </p>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { QBtn, QIcon } from 'quasar';

@Component({
    name: 'error404',
    components: {
        QBtn,
        QIcon,
    },
})
export default class Error404 extends Vue {
    get canGoBack() {
        return window.history.length > 1;
    }

    goBack() {
        window.history.go(-1);
    }
}
</script>

<style scoped lang="stylus">
.error-code
    color rgba(50, 50, 50, 0.6)
    overflow hidden
    height 50vh
    width 100%
    padding-top 15vh
    @media (orientation landscape)
        font-size 10rem
    @media (orientation portrait)
        font-size 14rem

.error-card
    margin 0 auto 50px auto
    border-radius 2px
    width 80vw
    max-width 600px
    padding 25px
    > i
        font-size 5rem
</style>
