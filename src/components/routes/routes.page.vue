<template>
  <div class="routes-page">
    <div class="row">
      <div class="col-12">

      </div>
    </div>
    <div class="row">
      <div v-for="route in routes" class="col-sm-12 col-md-6 col-lg-3 col-xl-2">
        <img src="https://via.placeholder.com/150" alt="Image of the tourist route" />
        <h3>{{ route.title }}</h3>
        <span>{{ route.description }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {RouteResponse} from 'tyr-api/types/axios';
  import {routeService} from '@/services/generated-services';

  @Component
  export default class RoutesPage extends Vue implements ComponentOptions<RoutesPage> {
    routes: RouteResponse[] = [];

    created(): void {
      routeService.getMostPopularRoutes().then(response => this.routes = response.data);
    }
  }
</script>

<style lang="scss" scoped>

</style>
