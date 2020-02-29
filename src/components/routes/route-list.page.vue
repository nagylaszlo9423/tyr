<template>
  <page class="routes-list-page">
    <card-board :items="routes" :item-navigation-path="editPageRoute"></card-board>
  </page>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {routeService} from '@/services/generated-services';
  import Page from '@/components/common/page.vue';
  import CardBoard from '@/components/common/card-board/card-board.vue';
  import ImageView from '@/components/common/image-view.vue';
  import {CardItem} from '@/components/common/card-board/card-item';

  @Component({
    components: {ImageView, CardBoard, Page}
  })
  export default class RouteListPage extends Vue implements ComponentOptions<RouteListPage> {
    readonly editPageRoute = '/pages/routes/edit';
    routes: CardItem[] = [];

    async created(): Promise<void> {
      const res = await routeService.getMostPopularRoutes('most-popular');
      this.routes = res.data.map(route => ({
        id: route.id,
        title: route.title,
        icon: '',
        imgSrc: 'https://via.placeholder.com/150',
        controls: [{route: '/pages/routes/edit', icon: 'pen'}]
      } as CardItem));
    }
  }
</script>

<style lang="scss" scoped>

</style>
