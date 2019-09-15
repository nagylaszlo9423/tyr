<template>
  <div id="app">
    <Menu></Menu>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
  import "./router/Router";
  import HelloWorld from "./components/HelloWorld.vue"
  import Vue from 'vue';
  import Component from "vue-class-component";
  import TyrMap from "./components/map/TyrMap.vue";
  import Menu from "./components/common/Menu.vue";
  import TopBar from "./components/common/TopBar.vue"
  import BootstrapVue from "bootstrap-vue";

  @Component({
    name: 'App',
    components: {
      Menu,
      TopBar,
      HelloWorld,
      TyrMap
    }
  })
  export default class App extends Vue {
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
  @import "style.scss";
</style>
