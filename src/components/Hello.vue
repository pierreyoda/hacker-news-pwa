<template>
    <div class="hello">
        <h5>Hello World</h5>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    name: "hello",
})
export default class Hello extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.hello
  margin-top 50px
  a
    color #35495E

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px
</style>
