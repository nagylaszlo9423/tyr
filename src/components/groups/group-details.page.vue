<template>
  <page>
    <div>
      <b-button type="primary" @click="$router.push(`/pages/groups/edit/${id}`)">{{$t('EDIT_GROUP')}}</b-button>
    </div>
    <div>
      <span>{{group.name}}</span>
    </div>
    <div>
      <span>{{group.description}}</span>
    </div>
  </page>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import Page from '@/components/common/page.vue';
  import {GroupResponse} from 'tyr-api/types/axios';
  import {groupService} from '@/services/generated-services';

  @Component({
    components: {Page}
  })
  export default class GroupDetailsPage extends Vue implements ComponentOptions<GroupDetailsPage> {
    private group: GroupResponse = {} as any;
    private id: string;

    async created(): Promise<void> {
      this.id = this.$route.params.id;

      if (this.id) {
        this.group = await groupService.findById(this.id).then(_ => _.data);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
