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
  import {routeService} from '../../services/Services';
  import {RouteResponse} from 'tyr-api';
  import {ValidationObserver} from 'vee-validate';

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
        this.route = new RouteResponse();
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
