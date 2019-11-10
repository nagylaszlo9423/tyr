<template>
  <b-form>
    <div></div>
  </b-form>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Route} from '../../models/Route';
  import {ComponentOptions} from 'vue';
  import {routeService} from '../../services/route/RouteService';

  @Component
  export default class EditRoutePage extends Vue implements ComponentOptions<EditRoutePage> {
    route: Route;

    created(): void {
      if (this.$route.params.id) {
        routeService.getById(this.$route.params.id).then(route => this.route = route);
      } else {
        this.route = new Route();
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
