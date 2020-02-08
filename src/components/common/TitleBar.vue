<template>
  <div id="title-bar" class="d-flex p-1">
    <div id="title-bar-left-controls" class="d-flex flex-row mr-auto">
      <h3>Logo</h3>
    </div>
    <div id="title-bar-right-controls" class="d-flex flex-row justify-content-end align-items-center pl-2">
      <b-input id="search-field" name="search-field" :class="{'open': isSearchFieldOpen}" />
      <b-button variant="link" type="button" class="btn btn-toolbar" @click="isSearchFieldOpen = !isSearchFieldOpen"><font-awesome-icon class="fa-1x" icon="search-location"></font-awesome-icon></b-button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';

  @Component
  export default class TitleBar extends Vue {
    isSearchFieldOpen = false;
  }
</script>

<style lang="scss" scoped>
  @import "../../style/variables";

  #title-bar {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: $primary;
    color: $text-light;
    svg {
      color: $accent;
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
