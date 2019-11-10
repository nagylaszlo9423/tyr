<template>
  <div id="app" :class="`theme-${theme}`">
    <simplert>
    </simplert>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import "./Router";
  import Vue, {ComponentOptions} from 'vue';
  import Component from "vue-class-component";
  import BootstrapVue from "bootstrap-vue";
  import {authGuard} from './guards/AuthGuard';
  import {AxiosClient} from 'tyr-api';
  const Simplert = require('vue2-simplert');

  @Component({
    name: 'App',
    components: {
      Simplert
    }
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
