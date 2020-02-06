<template>
  <div class="pages d-flex flex-column align-items-stretch">
    <title-bar></title-bar>
    <div class="pages-container d-flex flex-row">
      <navigation-drawer></navigation-drawer>
      <div class="pages-content container-fluid p-2 overflow-hidden" :class="{map: isMapPageOpen}">
        <router-view></router-view>
      </div>
      <tyr-map></tyr-map>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Watch} from 'vue-property-decorator';
  import NavigationDrawer from './common/NavigationDrawer.vue';
  import TitleBar from './common/TitleBar.vue';
  import TyrMap from './map/TyrMap.vue';
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

  .pages, .pages-container {
    height: 100%;
  }

  .pages-container {
    position: relative;
  }

  .pages-content {
    z-index: 11;
    background-color: $background;
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
