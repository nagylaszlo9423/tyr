<template>
  <div id="app" :class="`theme-${theme}`">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import './router';
  import Vue, {ComponentOptions} from 'vue';
  import Component from 'vue-class-component';
  import BootstrapVue from 'bootstrap-vue';

  @Component({
    name: 'app'
  })
  export default class App extends Vue implements ComponentOptions<App> {
    private theme = 'default';

    created() {
      Vue.use(BootstrapVue);
    }

    errorCaptured(error: Error) {
      this.$toasted.show(error.message, {type: 'error'});
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    left: 0;
    top: 0;
    position: fixed;
    min-height: 100%;
    min-width: 100%;
  }
</style>
