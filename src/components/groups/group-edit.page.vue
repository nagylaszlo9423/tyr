<template>
  <ValidationObserver ref="validator" tag="form"
                      class="layout-container layout-vertical" novalidate @submit.prevent="onSubmit">
    <page :title="$t('groups.EDIT_GROUP', {name: request.name})" icon="edit">
      <b-row>
        <b-col md="12" lg="6">
          <input-field
            id="name"
            :label="$t('groups.NAME')"
            v-model="request.name"
            rules="required"></input-field>
        </b-col>
        <b-col md="12" lg="6">
          <select-field id="accessLevel"
                        :label="$t('groups.JOIN_POLICY')"
                        :options="joinPolicies"
                        v-model="request.joinPolicy"
                        rules="required"></select-field>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" lg="6">
          <textarea-field id="description"
                          :label="$t('groups.DESCRIPTION')"
                          v-model="request.description"
                          rules="required"></textarea-field>
        </b-col>
      </b-row>
      <b-row class="my-3">
        <b-col sm="0" md="6" lg="9"></b-col>
        <b-col sm="12" md="6" lg="3">
          <b-button block type="submit" variant="primary">{{$t(pageType === pageTypes.CREATE ? 'CREATE' : 'UPDATE')}}</b-button>
        </b-col>
      </b-row>
    </page>
  </ValidationObserver>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {ValidationObserver} from 'vee-validate';
  import {Vue} from '@/types';
  import {groupService} from '@/services/generated-services';
  import Page from '@/components/common/page.vue';
  import TextareaField from '@/components/common/controls/textarea-field.vue';
  import InputField from '@/components/common/controls/input-field.vue';
  import SelectField from '@/components/common/controls/select-field.vue';
  import {PageType} from '@/utils/utils';
  import {GroupRequest} from 'tyr-api/types/axios';
  import {GroupJoinPolicy} from '@/components/groups/group-join-policy';

  @Component({
    components: {SelectField, TextareaField, InputField, Page, ValidationObserver}
  })
  export default class GroupEditPage extends Vue implements ComponentOptions<GroupEditPage> {
    private request: GroupRequest = {};
    private id: string;
    private pageType: PageType;
    private pageTypes = PageType;

    joinPolicies = Object.keys(GroupJoinPolicy);

    created(): void {
      this.id = this.$route.params.id;
      if (this.id) {
        this.pageType = PageType.EDIT;
        this.loadGroup(this.id).then(group => this.request = group);
      } else {
        this.pageType = PageType.CREATE;
        this.request = {} as GroupRequest;
      }
    }

    async onSubmit() {
      const valid = await this.$refs.validator.validate();

      if (valid) {
        if (this.id) {
          await groupService.updateGroup(this.id, this.request);
        } else {
          await groupService.createGroup(this.request);
        }
      }
    }

    async loadGroup(id: string): Promise<GroupRequest> {
      const groupResponse = (await groupService.findById(id)).data;
      return {
        name: groupResponse.name,
        description: groupResponse.description,
        joinPolicy: groupResponse.joinPolicy
      };
    }
  }
</script>

<style lang="scss" scoped>

</style>
