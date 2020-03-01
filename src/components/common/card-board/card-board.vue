<template>
  <div v-if="items.length" class="tyr-card-board">
    <card v-for="(item, index) in items_" :key="index" @click.native="cardClick(item.id)" :item="item"></card>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import ImageView from '@/components/common/image-view.vue';
  import Card from '@/components/common/card-board/card.vue';
  import {CardItem} from '@/components/common/card-board/card-item';

  const path = require('path');

  @Component({
    name: 'card-board',
    components: {
      ImageView,
      Card
    }
  })
  export default class CardBoard extends Vue {
    @Prop() items: CardItem[];
    @Prop() itemNavigationPath: string;

    items_: any[] = [];

    cardClick(id: string) {
      if (this.itemNavigationPath && id) {
        this.$router.push(path.join(this.itemNavigationPath, id));
      } else {
        this.$toasted.error(this.$tc('paths.UNABLE_OPEN_PATH_DETAILS'));
      }
    }

    @Watch('items')
    watchItems(items: any[]) {
      this.items_ = items;
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/media";

  .tyr-card-board {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

</style>
