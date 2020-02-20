<template>
  <ValidationObserver ref="validator" tag="form"
                      class="layout-container layout-vertical" novalidate @submit.prevent="onSubmit">
    <page :title="$t('groups.EDIT_GROUP', {name: request.name})" icon="edit">
      <b-row>
        <b-col md="12" lg="6">
          <input-field
            id="name"
            :label="$t('groups.NAME')"
            :value="request.name"
            rules="required"></input-field>
        </b-col>
        <b-col md="12" lg="6">
          <input-field
            id="access"
            :label="$t('groups.ACCESS')"
            :value="request.access"
            rules="required"></input-field>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" lg="6">
          <textarea-field id="description" :label="$t('groups.DESCRIPTION')" :value="request.description"></textarea-field>
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
  import {CreateGroupRequest} from 'tyr-api';
  import {ComponentOptions} from 'vue';
  import Page from '@/components/common/Page.vue';
  import InputField from '@/components/common/controls/InputField.vue';
  import TextareaField from '@/components/common/controls/TextareaField.vue';
  import {ValidationObserver} from 'vee-validate';
  import {Vue} from '@/Types';
  import {groupService} from '@/services/Services';

  @Component({
    components: {TextareaField, InputField, Page, ValidationObserver}
  })
  export default class EditGroupPage extends Vue implements ComponentOptions<EditGroupPage> {
    private request: CreateGroupRequest;

    created(): void {
      this.request = {
        name: 'asdqwe',
        access: 'asdqwe',
        description: 'asdqwe'
      };
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
