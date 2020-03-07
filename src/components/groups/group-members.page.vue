<template>
  <page>
    <b-row>
      <b-col>
        <b-card-group v-if="page.items.length">
          <b-card v-for="member in page.items" :key="member.id">
            <b-card-text>{{member.email}}</b-card-text>
          </b-card>
        </b-card-group>
        <empty-row v-if="!page.items.length"></empty-row>
      </b-col>
    </b-row>
  </page>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Page from '@/components/common/page.vue';
  import {GroupMembersNs} from '@/store/namespaces';
  import {MappedAction, MappedActionWithParam} from '@/store/mapped-action';
  import {GroupMemberModel} from '@/models/group-member.model';
  import {PageModel} from '@/models/page.model';
  import {ComponentOptions} from 'vue';
  import EmptyRow from '@/components/common/empty-row.vue';

  @Component({
    components: {EmptyRow, Page}
  })
  export default class GroupMembersPage extends Vue implements ComponentOptions<GroupMembersPage> {
    @GroupMembersNs.Action('getGroupMembers') getGroupMembers: MappedActionWithParam<string>;
    @GroupMembersNs.Action('getNextPage') getNextPage: MappedAction;
    @GroupMembersNs.Getter('page') page: PageModel<GroupMemberModel>;

    created(): void {
      const groupId = this.$route.params.id;

      if (groupId) {
        this.getGroupMembers(groupId);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
