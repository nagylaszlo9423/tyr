<template>
  <page>
    <b-button @click="toCreateGroupPage">Create group</b-button>
    <card-board :items="items" :item-navigation-path="detailsPagePath">
      <template v-slot="{item}">
        <image-view class="card-image" fit="frame" src="https://via.placeholder.com/150"></image-view>
        <div class="card-content">
          <span class="card-title">{{ item.name }}</span>
        </div>
      </template>
    </card-board>
  </page>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {GroupResponse} from 'tyr-api/types/axios';
  import {groupService} from '@/services/generated-services';
  import CardBoard from '@/components/common/tables/card-board.vue';
  import Page from '@/components/common/page.vue';
  import ImageView from '@/components/common/image-view.vue';

  @Component({
    components: {
      ImageView,
      Page,
      CardBoard
    }
  })
  export default class GroupListPage extends Vue implements ComponentOptions<GroupListPage> {
    currentPage: number;
    detailsPagePath = '/pages/groups';
    items: GroupResponse[];

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
      this.items = response.data.items;
      this.currentPage++;
    }
  }
</script>

<style lang="scss" scoped>
  .card-image {
    position: absolute;
    top: 0;
    left: 0;
  }

  .card-content {
    position: relative;
    height: 13rem;
    width: 10rem;

    .card-title {
      position: absolute;
      bottom: 0;
    }
  }
</style>
