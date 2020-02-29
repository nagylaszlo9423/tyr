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
          <textarea-field id="description" rules="required" :label="$t('DESCRIPTION')" v-model="route.description"></textarea-field>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-xl-10 p-4"></div>
        <div class="col-md-12 col-lg-6 col-xl-2 py-4 px-5">
          <b-button variant="primary" block type="submit">{{$t('SAVE')}}</b-button>
        </div>
      </div>
    </ValidationObserver>
  </page>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {ValidationObserver} from 'vee-validate';
  import {routeService} from '@/services/generated-services';
  import Page from '@/components/common/page.vue';
  import InputField from '@/components/common/controls/input-field.vue';
  import {MapPageState} from '@/components/map/map.routes';
  import {Vue} from '@/types';
  import TextareaField from '@/components/common/controls/textarea-field.vue';
  import {Path} from '@/components/map/features/path';
  import {RouteModel} from '@/models/route-model';
  import {Coordinate} from 'ol/coordinate';
  import {RouteMapper} from '@/components/routes/route.mapper';

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
    route: RouteModel = new RouteModel();

    async created(): Promise<void> {
      if (this.$route.params.id) {
        routeService.getRouteById(this.$route.params.id).then(_ => {
          this.route = RouteMapper.responseToModel(_.data);
        });
      } else {
        const path: Coordinate[] = await this.$store.getters['route/recordedPath'];
        this.route = new RouteModel({
          path: new Path(path)
        });
      }
    }

    async onSubmit() {
      const isValid = await this.$refs.validator.validate();

      if (isValid && this.route.path.isValid()) {
        await this.save();
      }
    }

    async save() {
      const requestBody = RouteMapper.modelToRequest(this.route);

      try {
        if (this.route.id) {
          await routeService.updateRouteById(this.route.id, requestBody);
          this.$toasted.success(this.$tc('UPDATED_SUCCESSFULLY'));
        } else {
          await routeService.createRoute(requestBody);
          this.$toasted.success(this.$tc('CREATED_SUCCESSFULLY'));
        }
        this.$router.push('/pages/map');
      } catch (e) {
        this.$toasted.error(this.$tc('FAILED_TO_SAVE'));
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
