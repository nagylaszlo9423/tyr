<template>
  <div class="pages d-flex flex-column align-items-stretch">
    <title-bar></title-bar>
    <div class="pages-container d-flex flex-row">
      <navigation-drawer></navigation-drawer>
      <div class="pages-content container-fluid p-2 overflow-hidden">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from "vue-property-decorator";
  import NavigationDrawer from "./common/NavigationDrawer.vue";
  import TitleBar from "./common/TitleBar.vue";
  import {authService} from '../services/AuthService';

  @Component({
    components: {
      TitleBar,
      NavigationDrawer
    }
  })
  export default class Pages extends Vue {
    created() {
      this.$router.beforeEach(async (to, from, next) => {
        if (await authService.isLoggedIn()) {
          return next();
        }
        return next(false);
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/media";

  .pages, .pages-container  {
    height: 100%;
  }

  .pages-container  {
    position: relative;
  }

  .pages-content {
    margin-left: 3rem;
  }

  @include media-sm {
    .pages-content  {
      margin-left: 0;
    }
  }

</style>
