<template>
  <div class="tyr-card-board">
    <card v-for="(item, index) in items_" :key="index" @click.native="onItemClick(item.id)" :item="item"></card>
    <empty-row v-if="!items_.length"></empty-row>
  </div>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
  import ImageView from '@/components/common/image-view.vue';
  import Card from '@/components/common/card-board/card.vue';
  import {CardItem} from '@/components/common/card-board/card-item';
  import EmptyRow from '@/components/common/empty-row.vue';

  const path = require('path');

  @Component({
    name: 'card-board',
    components: {
      EmptyRow,
      ImageView,
      Card
    }
  })
  export default class CardBoard extends Vue {
    @Prop() items: CardItem[];

    items_: any[] = [];

    @Emit()
    onItemClick(id: string) {
      return id;
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

    @include media-sm {
      justify-content: start;
    }

    @include media-xs {
      justify-content: center;
    }
  }

</style>
