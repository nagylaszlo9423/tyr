<template>
  <router-view></router-view>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {RouteResponse} from 'tyr-api/types/axios';
  import {routeService} from '@/services/generated-services';

  @Component
  export default class RoutesPage extends Vue {
    routes: RouteResponse[] = [];
  }
</script>

<style lang="scss" scoped>

</style>
