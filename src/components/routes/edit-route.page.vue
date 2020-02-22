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

  @Component({
    components: {
      ValidationObserver
    }
  })
  export default class EditRoutePage extends Vue implements ComponentOptions<EditRoutePage> {
    route: RouteResponse;

    created(): void {
      if (this.$route.params.id) {
        routeService.getRouteById(this.$route.params.id).then(response => this.route = response.data);
      } else {
        this.route = {} as RouteResponse;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
