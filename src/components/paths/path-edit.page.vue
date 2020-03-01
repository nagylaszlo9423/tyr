<template>
  <page :title="$t('paths.EDIT_PATH')"
        :back-button-title="$t('paths.MODIFY_PATH')"
        back-button-icon="pen"
        :back-button-route="routeBackToEditing">
    <ValidationObserver ref="validator" tag="form"
                        class="layout-container layout-vertical" novalidate @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-md-12 col-lg-6">
         <input-field id="title"
                      rules="required"
                      :label="$t('TITLE')"
                      v-model="pathModel.title"
                      :readonly="readonly"></input-field>
        </div>
        <div class="col-md-12 col-lg-6">
          <textarea-field id="description"
                          rules="required"
                          :label="$t('DESCRIPTION')"
                          v-model="pathModel.description"
                          :readonly="readonly"></textarea-field>
        </div>
      </div>
      <div v-if="!readonly" class="row">
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
  import {pathService} from '@/services/generated-services';
  import Page from '@/components/common/page.vue';
  import InputField from '@/components/common/controls/input-field.vue';
  import {MapPageState} from '@/components/map/map.routes';
  import {Vue} from '@/types';
  import TextareaField from '@/components/common/controls/textarea-field.vue';
  import {PathModel} from '@/models/path-model';
  import {PathMapper} from '@/components/paths/path-mapper';
  import {PageType} from '@/utils/utils';
  import {PathNs} from '@/store/namespaces';

  @Component({
    components: {
      TextareaField,
      InputField,
      Page,
      ValidationObserver
    }
  })
  export default class PathEditPage extends Vue implements ComponentOptions<PathEditPage> {
    private readonly routeBackToEditing = `/pages/map/${MapPageState.EDIT}`;

    @PathNs.Getter('model', {}) pathModel: PathModel;
    @PathNs.Action('clearModel') clearModel: Function;
    @PathNs.Action('getPathById') getPathById: Function;

    pageType = PageType.VIEW;
    readonly = true;

    async created(): Promise<void> {
      this.pageType = this.$route.meta.pageType !== undefined ? this.$route.meta.pageType : PageType.VIEW;
      this.readonly = this.pageType === PageType.VIEW;
      await this.load(this.pageType, this.$route.params.id);
    }

    load(pageType: PageType, id?: string) {
      if (id) {
        this.getPathById(id);
      }
    }

    async onSubmit() {
      const isValid = await this.$refs.validator.validate();

      if (isValid && this.pathModel.coordinates.length > 1) {
        await this.save();
      }
    }

    async save() {
      const requestBody = PathMapper.modelToRequest(this.pathModel);

      try {
        if (this.pageType === PageType.EDIT && this.pathModel.id) {
          await pathService.updatePathById(this.pathModel.id, requestBody);
          this.$toasted.success(this.$tc('UPDATED_SUCCESSFULLY'));
        } else if (this.pageType === PageType.CREATE) {
          await pathService.createPath(requestBody);
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
