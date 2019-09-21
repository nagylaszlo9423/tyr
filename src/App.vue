<template>
  <div id="app">
    <div class="container-fluid" :class="'theme-'+theme">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
  import "./router/Router";
  import Vue from 'vue';
  import Component from "vue-class-component";
  import BootstrapVue from "bootstrap-vue";

  @Component({
    name: 'App',
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
</style>
