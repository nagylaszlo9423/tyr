<template>
  <nav class="navbar navbar-brand">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="search" class="nav-link">
          <font-awesome-icon class="fa-2x" icon="search-location" />
        </router-link>
      </li>
      <li class="nav-item active">
        <router-link to="map" class="nav-link">
          <font-awesome-icon class="fa-2x" icon="map-marked"></font-awesome-icon>
          <i class="fas fa-map-marked"></i>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">

  import {Component, Vue} from "vue-property-decorator";

  @Component
  export default class Menu extends Vue {

  }

</script>

<style lang="scss" scoped>
  .navbar {
    position: absolute;
    z-index: 10000;
    top: 0;
    left: 0;
    border-right: 1px black solid;
    border-bottom: 1px black solid;
    background: white;
  }
</style>
