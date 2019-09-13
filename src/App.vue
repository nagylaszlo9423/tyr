<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <TyrMap></TyrMap>
  </div>
</template>

<script lang="ts">
  import HelloWorld from './components/HelloWorld.vue'
  import Vue from 'vue';
  import BootstrapVue from "bootstrap-vue";
  import TyrMap from "./components/TyrMap.vue";
  import Component from "vue-class-component";

  @Component({
    name: 'App',
    components: {
      HelloWorld,
      TyrMap
    },
    created: () => {
      Vue.use(BootstrapVue);
    }
  })
  export default class App extends Vue {
  }
</script>

<style>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
