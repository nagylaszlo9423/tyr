<template>
  <div id="app" class="container-fluid p-0" :class="'theme-'+theme">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import "./Router";
  import Vue from 'vue';
  import Component from "vue-class-component";
  import BootstrapVue from "bootstrap-vue";

  @Component({
    name: 'App'
  })
  export default class App extends Vue {
    private theme = 'default';

    created() {
      Vue.use(BootstrapVue);
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
