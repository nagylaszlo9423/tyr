<template>
  <div id="title-bar" class="d-flex justify-content-between p-1">
    <div class="d-flex flex-row">
      <button @click="toggleNavDrawer()" type="button" class="btn btn-toolbar"><font-awesome-icon class="fa-1x" icon="bars"></font-awesome-icon></button>
      <h3>Logo</h3>
    </div>
    <div class="d-flex flex-row">
      <input  />
      <button type="button" class="btn btn-toolbar"><font-awesome-icon class="fa-1x" icon="search-location"></font-awesome-icon></button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {EventBus} from '../../services/EventBus';

  @Component
  export default class TitleBar extends Vue {
    toggleNavDrawer() {
      console.log('toggleNavDrawer');
      EventBus.$emit('navigation-drawer:toggle');
    }
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
  }
</style>
