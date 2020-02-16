<template>
  <div>
    <card-board :items="items"></card-board>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import CardBoard from '../common/tables/CardBoard.vue';
  import {CardBoardModel} from '../common/tables/CardBoardModel';
  import {ComponentOptions} from 'vue';
  import {groupService} from '@/services/Services';
  import {GroupResponse, PageResponse} from 'tyr-api';

  @Component({
    components: {
      CardBoard
    }
  })
  export default class Groups extends Vue implements ComponentOptions<Groups> {
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

    private async load() {
      const response = await groupService.getGroupsPaged({page: this.currentPage, size: 10});
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
