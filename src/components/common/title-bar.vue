<template>
  <div id="title-bar" class="d-flex p-1">
    <div id="title-bar-left-controls" class="d-flex flex-row align-items-center mr-auto">
      <b-button variant="link" @click="toggleNavDrawer"><font-awesome-icon class="fa-1x" icon="bars"></font-awesome-icon></b-button>
      <compass-loader id="title-bar-loader" enable-background="true" size="2"></compass-loader>
      <h3 class="ml-2">TYR</h3>
    </div>
    <div id="title-bar-right-controls" class="d-flex flex-row justify-content-end align-items-center pl-2">
      <b-input id="search-field" name="search-field" :class="{open: isSearchFieldOpen}" />
      <b-button variant="link" type="button" class="btn btn-toolbar" :class="{'d-none': isSearchButtonHidden}" @click="toggleSearchField"><font-awesome-icon class="fa-1x" icon="search"></font-awesome-icon></b-button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Watch} from 'vue-property-decorator';
  import {events} from '@/services/events';
  import {eventBus} from '@/services/event-bus';
  import CompassLoader from '@/components/common/loaders/compass-loader.vue';
  import {ComponentOptions} from 'vue';
  import {Route} from 'vue-router';
  @Component({
    components: {CompassLoader}
  })
  export default class TitleBar extends Vue implements ComponentOptions<TitleBar> {
    isSearchFieldOpen = false;
    isToggled = false;
    isSearchFieldTurnedOff = false;
    isSearchButtonHidden = true;

    created(): void {
      this.setRouteMetaData(this.$route);
    }

    @Watch('$route')
    watchRoute(route: Route) {
      this.setRouteMetaData(this.$route);
    }

    setRouteMetaData(route: Route) {
      this.isSearchButtonHidden = !route.meta.showTitleBarSearchButton;
      this.isSearchFieldTurnedOff = !route.meta.showTitleBarSearchField;
    }

    toggleSearchField() {
      this.isToggled = !this.isToggled;
      if (!this.isSearchFieldTurnedOff) {
        this.isSearchFieldOpen = this.isToggled;
      }
      eventBus.$emit(events.common.titleBar.toggleSearch);
    }

    toggleNavDrawer() {
      eventBus.$emit(events.common.titleBar.toggleNavigationDrawer);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/variables";

  #title-bar {
    background-color: $primary;
    color: $text-light;
    z-index: 9;
    svg {
      color: white;
    }

    #title-bar-right-controls {
      position: relative;
      right: 0;

      #search-field {
        width: 0;
        opacity: 0;
        transition: width .5s ease-in-out, opacity .5s;

        &.open {
          width: 80%;
          opacity: 1;
        }
      }
    }
  }
</style>
