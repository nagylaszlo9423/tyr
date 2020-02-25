<template>
  <ValidationObserver >
    <div class="row">
      <div class="col">
        <input />
      </div>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {ValidationObserver} from 'vee-validate';
  import { RouteResponse } from 'tyr-api/types/axios';
  import {routeService} from '@/services/generated-services';
  import {Path} from '@/components/map/features/path';

  @Component({
    components: {
      ValidationObserver
    }
  })
  export default class RouteEditPage extends Vue implements ComponentOptions<RouteEditPage> {
    route: RouteResponse;

    async created(): Promise<void> {
      if (this.$route.params.id) {
        routeService.getRouteById(this.$route.params.id).then(response => this.route = response.data);
      } else {
        this.route = {} as RouteResponse;
        const path: Path = await this.$store.getters['auth/recordedPath'];
        this.route.path = {
          type: 'LineString',
          coordinates: path.lineString.getCoordinates()
        };
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
