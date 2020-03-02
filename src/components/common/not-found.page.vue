<template>
  <div>
    <h1>Not found</h1>
    <b-button @click="goBack">{{$t('GO_BACK')}}</b-button>
    <b-button @click="goHome">{{$t('GO_HOME')}}</b-button>
    <b-button @click="spin = !spin">Spin on/off</b-button>

    <compass-loader :enable-background="true" :loading="spin" :size="5"></compass-loader>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {Route} from 'vue-router';
  import CompassLoader from '@/components/common/loaders/compass-loader.vue';

  @Component({
    components: {CompassLoader}
  })
  export default class NotFoundPage extends Vue implements ComponentOptions<NotFoundPage> {
    fromRoute: Route;
    spin = false;

    beforeRouteEnter(to: Route, from: Route, next: (to: ((vm: NotFoundPage) => any)) => void) {
      next((vm: NotFoundPage) => vm.fromRoute = from);
    }

    goBack() {
      this.$router.back();
    }

    goHome() {
      this.$router.push('/');
    }

  }
</script>

<style lang="scss" scoped>

</style>
