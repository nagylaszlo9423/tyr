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
  import {authService} from "./services/AuthService";

  @Component({
    name: 'App'
  })
  export default class App extends Vue implements ComponentOptions<App> {
    private theme = 'default';

    created() {
      Vue.use(BootstrapVue);
      this.$router.beforeEach(async (to, from, next) => {
        console.log('guard');
        if (to.path.indexOf('/pages') > -1) {
          if (!await authService.isLoggedIn()) {
            return next();
          }
        } else {
          return next();
        }

        authService.logout();
        next(false);
        this.$router.push('/login');
      });
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
