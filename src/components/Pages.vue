<template>
  <top-bar></top-bar>
  <div class="pages-content">
    <Menu></Menu>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from "vue-property-decorator";
  import Menu from "./common/Menu.vue";
  import TopBar from "./common/TopBar.vue";
  import TyrMap from "./map/TyrMap.vue";
  import HelloWorld from "./HelloWorld.vue";

  @Component({
    components: {
      Menu,
      TopBar,
      TyrMap,
      HelloWorld
    }
  })
  export default class Pages extends Vue {
  }
</script>

<style lang="scss" scoped>
  .pages-content {
    position: relative;
  }
</style>
