import {PageType} from '@/utils/utils';
<template>
  <page :title="$t('groups.EDIT_GROUP', {name: groupModel.name})" icon="edit">
    <ValidationObserver ref="validator" tag="form"
                        class="layout-container layout-vertical" novalidate @submit.prevent="onSubmit">
      <b-row>
        <b-col md="12" lg="6">
          <input-field
            id="name"
            :label="$t('groups.NAME')"
            :readonly="readonly"
            v-model="groupModel.name"
            rules="required"></input-field>
        </b-col>
        <b-col md="12" lg="6">
          <select-field id="accessLevel"
                        :label="$t('groups.JOIN_POLICY')"
                        :options="joinPolicies"
                        :readonly="readonly"
                        translation-namespace="groups.joinPolicies"
                        v-model="groupModel.joinPolicyName"
                        rules="required"></select-field>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" lg="6">
          <textarea-field id="description"
                          :label="$t('groups.DESCRIPTION')"
                          v-model="groupModel.description"
                          :readonly="readonly"
                          rules="required"></textarea-field>
        </b-col>
      </b-row>
      <b-row v-if="!readonly" class="my-3">
        <b-col lg="6"></b-col>
        <b-col sm="12" md="6" lg="3" class="my-1">
          <b-button v-if="pageType === pageTypes.EDIT" block variant="primary" @click="goToMembersPage">
            {{$t('groups.EDIT_MEMBERS')}}
          </b-button>
        </b-col>
        <b-col sm="12" md="6" lg="3" class="my-1">
          <b-button block type="submit" variant="primary">{{$t(pageType === pageTypes.CREATE ? 'CREATE' : 'UPDATE')}}
          </b-button>
        </b-col>
      </b-row>
    </ValidationObserver>
  </page>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {ValidationObserver} from 'vee-validate';
  import Page from '@/components/common/page.vue';
  import TextareaField from '@/components/common/controls/textarea-field.vue';
  import InputField from '@/components/common/controls/input-field.vue';
  import SelectField from '@/components/common/controls/select-field.vue';
  import {enumKeys, PageType} from '@/utils/utils';
  import {GroupJoinPolicy} from '@/components/groups/group-join-policy';
  import {GroupNs} from '@/store/namespaces';
  import {GroupModel} from '@/models/group.model';
  import {MappedActionWithParam} from '@/store/mapped-action';
  import {BaseVue} from '@/components/common/base/base.vue';

  @Component({
    components: {SelectField, TextareaField, InputField, Page, ValidationObserver}
  })
  export default class GroupPage extends BaseVue implements ComponentOptions<GroupPage> {
    @GroupNs.Getter('model') groupModel: GroupModel;
    @GroupNs.Action('findById') findById: MappedActionWithParam<string>;
    @GroupNs.Action('saveModel') saveModel: MappedActionWithParam<GroupModel>;

    pageType: PageType;
    pageTypes = PageType;
    joinPolicies = enumKeys(GroupJoinPolicy);

    get readonly() {
      return this.pageType === PageType.VIEW;
    }

    created(): void {
      const id = this.$route.params.id;
      const pageType = this.$route.meta.pageType;
      this.pageType = pageType === undefined ? PageType.VIEW : pageType;
      if (id && id !== this.groupModel.id) {
        this.findById(id);
      }
    }

    async onSubmit() {
      const valid = await this.$refs.validator.validate();

      if (valid) {
        this.saveModel(this.groupModel);
        this.$toasted.success(this.$tc('SAVED_SUCCESSFULLY'));
        this.$router.push({name: 'groups-list'});
      }
    }

    goToMembersPage() {
      this.$router.push({name: 'view-group-members', params: {id: this.groupModel.id}});
    }
  }
</script>

<style lang="scss" scoped>

</style>
