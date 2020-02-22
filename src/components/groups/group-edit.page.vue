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
                        label="asdqwe"
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
          <b-button block type="submit" variant="primary">{{$t('CREATE')}}</b-button>
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
  import {CreateGroupRequest} from 'tyr-api/types/axios';
  import {groupService} from '@/services/generated-services';
  import Page from '@/components/common/page.vue';
  import TextareaField from '@/components/common/controls/textarea-field.vue';
  import InputField from '@/components/common/controls/input-field.vue';
  import SelectField from '@/components/common/controls/select-field.vue';

  @Component({
    components: {SelectField, TextareaField, InputField, Page, ValidationObserver}
  })
  export default class EditGroupPage extends Vue implements ComponentOptions<EditGroupPage> {
    private request: CreateGroupRequest;

    joinPolicies = ['INVITE_ONLY', 'REQUEST', 'PUBLIC'];

    created(): void {
      this.request = {} as CreateGroupRequest;
    }

    async onSubmit() {
      const valid = await this.$refs.validator.validate();

      if (valid) {
        await groupService.createGroup(this.request);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
