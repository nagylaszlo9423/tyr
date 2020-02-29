<template>
  <div>
    <h1>Not found</h1>
    <b-button @click="goBack">{{$t('GO_BACK')}}</b-button>
    <b-button @click="goHome">{{$t('GO_HOME')}}</b-button>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {Route} from 'vue-router';

  @Component
  export default class NotFoundPage extends Vue implements ComponentOptions<NotFoundPage> {
    fromRoute: Route;

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
