<template>
  <page class="paths-list-page">
    <card-board :items="routes" :item-navigation-path="editPageRoute"></card-board>
  </page>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import Page from '@/components/common/page.vue';
  import CardBoard from '@/components/common/card-board/card-board.vue';
  import ImageView from '@/components/common/image-view.vue';
  import {CardItem} from '@/components/common/card-board/card-item';
  import {pathService} from '@/services/generated-services';
  import {eventBus} from '@/services/event-bus';
  import {events} from '@/services/events';

  @Component({
    components: {ImageView, CardBoard, Page}
  })
  export default class PathListPage extends Vue implements ComponentOptions<PathListPage> {
    readonly editPageRoute = '/pages/paths/details';
    routes: CardItem[] = [];

    async created(): Promise<void> {
      eventBus.$emit(events.loader.start);
      const res = await pathService.getByFilter('own');
      this.routes = res.data.map(path => ({
        id: path.id,
        title: path.title,
        icon: '',
        imgSrc: 'https://via.placeholder.com/150',
        controls: [{route: '/pages/paths/edit', icon: 'pen'}]
      } as CardItem));
    }

    mounted(): void {
      eventBus.$emit(events.loader.stop);
    }
  }
</script>

<style lang="scss" scoped>

</style>
