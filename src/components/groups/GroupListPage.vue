<template>
  <div>
    <b-button @click="toCreateGroupPage">Create group</b-button>
    <card-board :items="items"></card-board>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import CardBoard from '../common/tables/CardBoard.vue';
  import {CardBoardModel} from '../common/tables/CardBoardModel';
  import {ComponentOptions} from 'vue';
  import {groupService} from '@/services/Services';
  import {GroupResponse} from 'tyr-api';

  @Component({
    components: {
      CardBoard
    }
  })
  export default class GroupListPage extends Vue implements ComponentOptions<GroupListPage> {
    currentPage: number;
    items: CardBoardModel[];

    constructor() {
      super();
      this.items = [];
      this.currentPage = 0;
    }

    created(): void {
      this.load();
      window.onscroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          this.load();
        }
      };
    }

    toCreateGroupPage() {
      this.$router.push('/pages/groups/edit');
    }

    private async load() {
      const response = await groupService.getGroupsPaged(this.currentPage, 10);
      const cardModels: CardBoardModel[] = this.mapGroupsToModel(response.data.items as Array<GroupResponse>);
      this.items.push(...cardModels);
      this.currentPage++;
    }

    private mapGroupsToModel(groups: GroupResponse[]): CardBoardModel[] {
      return groups.map(g => this.mapGroupToModel(g));
    }

    private mapGroupToModel(group: GroupResponse): CardBoardModel {
      return {
        title: group.name,
        description: group.description,
        imgSrc: ''
      };
    }
  }
</script>

<style lang="scss" scoped>

</style>
