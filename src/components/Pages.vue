<template>
  <div class="pages">
    <div class="pages-content d-flex flex-row">
      <NavigationBar></NavigationBar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from "vue-property-decorator";
  import TyrMap from "./map/TyrMap.vue";
  import HelloWorld from "./HelloWorld.vue";
  import NavigationBar from "./common/NavigationBar.vue";

  @Component({
    components: {
      NavigationBar,
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
