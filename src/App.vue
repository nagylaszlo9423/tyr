<template>
  <div id="app" :class="`theme-${theme}`">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import "./Router";
  import Vue, {ComponentOptions} from 'vue';
  import Component from "vue-class-component";
  import BootstrapVue from "bootstrap-vue";
  import {authGuard} from './guards/AuthGuard';

  @Component({
    name: 'App'
  })
  export default class App extends Vue implements ComponentOptions<App> {
    private theme = 'default';

    created() {
      Vue.use(BootstrapVue);
      this.$router.beforeEach(authGuard);
    }

    errorCaptured(error: Error) {
      this.$bvToast.toast(error.message, {variant: 'danger'});
    }
  }
</script>

<style>
  @import "../node_modules/normalize.css/normalize.css";

  #app {
    height: 100vh;
  }
</style>
