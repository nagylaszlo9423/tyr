<template>
  <nav class="navbar navbar-brand">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="" class="nav-link">
          <font-awesome-icon class="fa-2x" icon="search-location" />
        </router-link>
      </li>
      <li class="nav-item active">
        <router-link to="" class="nav-link"><i class="fas fa-map-marked"></i></router-link>
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
    float: left;
  }
</style>
