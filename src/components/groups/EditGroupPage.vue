<template>
  <page :title="$t('groups.EDIT_GROUP', {name: group.name})" icon="edit">
    <div class="row">
      <div class="col-md-12 col-lg-6">
        <input-field id="name1" label="asdqwe" :value="group.name"></input-field>
      </div>
      <div class="col-md-12 col-lg-6">
        <input-field id="name2" label="asdqwe" :value="group.name"></input-field>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-6">
        <textarea-field id="name3" label="asdqwe" :value="group.name"></textarea-field>
      </div>
    </div>
  </page>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {GroupResponse} from 'tyr-api';
  import {ComponentOptions} from 'vue';
  import Page from '@/components/common/Page.vue';
  import InputField from '@/components/common/controls/InputField.vue';
  import TextareaField from '@/components/common/controls/TextareaField.vue';

  @Component({
    components: {TextareaField, InputField, Page}
  })
  export default class EditGroupPage extends Vue implements ComponentOptions<EditGroupPage> {
    private group: GroupResponse;

    created(): void {
      this.group = {
        name: 'asdqwe',
        access: 'asdqwe',
        description: 'asdqwe',
        owner: 'asdqwe'
      };
    }
  }
</script>

<style lang="scss" scoped>

</style>
