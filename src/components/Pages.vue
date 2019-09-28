<template>
  <div class="pages d-flex flex-column align-items-stretch">
    <title-bar></title-bar>
    <div class="pages-content">
      <navigation-drawer></navigation-drawer>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from "vue-property-decorator";
  import NavigationDrawer from "./common/NavigationDrawer.vue";
  import TitleBar from "./common/TitleBar.vue";

  @Component({
    components: {
      TitleBar,
      NavigationDrawer
    }
  })
  export default class Pages extends Vue {
    created() {
      this.$router.beforeEach((to, from, next) => {
        console.log('guard');
        next(false);
      });
    }
  }
</script>

<style lang="scss" scoped>
  .pages, .pages-content {
    height: 100%;
  }

  .pages-content {
    position: relative;
  }
</style>
