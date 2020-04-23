<template>
  <page :title="$t('paths.EDIT_PATH')">
    <ValidationObserver ref="validator" tag="form"
                        class="layout-container layout-vertical" novalidate @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-md-12 col-lg-6">
         <input-field id="title"
                      rules="required"
                      :label="$t('TITLE')"
                      v-model="pathModel.name"
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
        <div class="col-md-12 col-lg-3 col-xl-2 pt-4 px-3 order-md-2 order-lg-0">
          <b-button variant="danger" block @click="deletePath">{{$t('DELETE')}}</b-button>
        </div>
        <div class="col-lg-3 col-xl-6"></div>
        <div class="col-md-12 col-lg-3 col-xl-2 pt-4 px-3 order-md-1 order-lg-1">
          <b-button variant="primary" block @click="modifyPath">{{$t('paths.MODIFY_PATH')}}</b-button>
        </div>
        <div class="col-md-12 col-lg-3 col-xl-2 pt-4 px-3 order-md-0 order-lg-2">
          <b-button variant="success" block type="submit">{{$t('SAVE')}}</b-button>
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
  import {MapPageType} from '@/components/map/map.routes';
  import TextareaField from '@/components/common/controls/textarea-field.vue';
  import {PageType} from '@/utils/utils';
  import {PathNs} from '@/store/namespaces';
  import {MappedAction, MappedActionWithParam} from '@/store/mapped-action';
  import {eventBus} from '@/services/event-bus';
  import {events} from '@/services/events';
  import {PathModel} from '@/models/path.model';
  import {PathMapper} from '@/models/mappers/path.mapper';
  import {BaseVue} from '@/components/common/base/base.vue';

  @Component({
    components: {
      TextareaField,
      InputField,
      Page,
      ValidationObserver
    }
  })
  export default class PathEditPage extends BaseVue implements ComponentOptions<PathEditPage> {
    @PathNs.Getter('model') pathModel: PathModel;
    @PathNs.Action('clearModelWithoutPath') clearModelWithoutPath: MappedAction;
    @PathNs.Action('getPathById') getPathById: MappedActionWithParam<string>;

    pageType = PageType.VIEW;
    readonly = true;

    async created(): Promise<void> {
      eventBus.$emit(events.loader.start);
      this.pageType = this.$route.meta.pageType !== undefined ? this.$route.meta.pageType : PageType.VIEW;
      this.readonly = this.pageType === PageType.VIEW;
      await this.load(this.pageType, this.$route.params.id);
    }

    mounted(): void {
      eventBus.$emit(events.loader.stop);
    }

    async load(pageType: PageType, id?: string) {
      if (id && id !== 'undefined') {
        await this.getPathById(id);
      } else {
        this.clearModelWithoutPath();
      }
    }

    async onSubmit() {
      const isValid = await this.$refs.validator.validate();

      if (isValid && this.pathModel.coordinates.length > 1) {
        await this.save();
      }
    }

    modifyPath() {
      this.$router.push(`/pages/map/${MapPageType.EDIT}`);
    }

    deletePath() {

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
        this.$router.push('/pages/paths');
      } catch (e) {
        this.$toasted.error(this.$tc('FAILED_TO_SAVE'));
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
