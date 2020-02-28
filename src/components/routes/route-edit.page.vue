<template>
  <page :title="$t('routes.EDIT_PATH')"
        :back-button-title="$t('routes.MODIFY_PATH')"
        back-button-icon="pen"
        :back-button-route="routeBackToEditing">
    <ValidationObserver ref="validator" tag="form"
                        class="layout-container layout-vertical" novalidate @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-md-12 col-lg-6">
         <input-field id="title" rules="required" :label="$t('TITLE')" v-model="route.title"></input-field>
        </div>
        <div class="col-md-12 col-lg-6">
          <textarea-field id="description" rules="required" :label="$t('DESCRIPTION')" v-model="route.title"></textarea-field>
        </div>
      </div>
    </ValidationObserver>
  </page>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {ValidationObserver} from 'vee-validate';
  import {CreateRouteRequest, RouteResponse} from 'tyr-api/types/axios';
  import {routeService} from '@/services/generated-services';
  import Page from '@/components/common/page.vue';
  import InputField from '@/components/common/controls/input-field.vue';
  import LineString from 'ol/geom/LineString';
  import {MapPageState} from '@/components/map/map.routes';
  import {Vue} from '@/types';
  import TextareaField from '@/components/common/controls/textarea-field.vue';

  @Component({
    components: {
      TextareaField,
      InputField,
      Page,
      ValidationObserver
    }
  })
  export default class RouteEditPage extends Vue implements ComponentOptions<RouteEditPage> {
    private readonly routeBackToEditing = `/pages/map/${MapPageState.EDIT}`;
    route: CreateRouteRequest;

    async created(): Promise<void> {
      if (this.$route.params.id) {
        routeService.getRouteById(this.$route.params.id).then(response => this.route = response.data);
      } else {
        this.route = {} as RouteResponse;
        const lineString: LineString = new LineString(await this.$store.getters['route/recordedPath']);
        this.route.path = {
          type: 'LineString',
          coordinates: lineString.getCoordinates()
        };
      }
    }

    async onSubmit() {
      const valid = await this.$refs.validator.validate();
    }
  }
</script>

<style lang="scss" scoped>

</style>
