<template>
  <page :title="$t('groups.EDIT_GROUP', {name: group.name})" icon="edit">
    <input-field id="name" label="asdqwe" :value="group.name"></input-field>
  </page>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {GroupResponse} from 'tyr-api';
  import {ComponentOptions} from 'vue';
  import Page from '@/components/common/Page.vue';
  import InputField from '@/components/common/controls/InputField.vue';

  @Component({
    components: {InputField, Page}
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
