<template>
  <div id="pages">
    <title-bar></title-bar>
    <navigation-drawer></navigation-drawer>
    <div class="pages-content" :class="{map: isMapPageOpen}">
      <router-view></router-view>
    </div>
    <tyr-map></tyr-map>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Watch} from 'vue-property-decorator';
  import NavigationDrawer from './common/navigation/navigation-drawer.vue';
  import TitleBar from './common/title-bar.vue';
  import TyrMap from './map/tyr-map.vue';
  import {Route} from 'vue-router';

  @Component({
    components: {
      TyrMap,
      TitleBar,
      NavigationDrawer
    }
  })
  export default class Pages extends Vue {
    isMapPageOpen = false;

    @Watch('$route', {immediate: true, deep: true})
    routeChange(to: Route) {
      this.isMapPageOpen = to.path.indexOf('/map') > -1;
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/media";
  @import "../style/theme";
  @import "../style/variables";

  #pages {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }

  #tyr-map {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }

  #navigation-drawer {
    height: calc(100% - #{$titleBarHeight});
  }

  #title-bar {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    height: $titleBarHeight;
  }

  .pages-content {
    position: relative;
    z-index: 11;
    background-color: $background;
    height: calc(100% - #{$titleBarHeight});
    overflow-x: hidden;
  }

  .pages-content.map {
    background-color: transparent;
    pointer-events: none;

    * {
      pointer-events: all;
    }
  }

  @include media-md {
    .pages-content {
      margin-left: 3rem;
    }
  }

  @include media-sm {
    .pages-content {
      position: relative;
      margin-left: 0;
    }
  }

</style>
