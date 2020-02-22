<template>
  <div class="tyr-card-board">
    <div v-if="items.length">
      <card v-for="(item, name, index) in items" :key="index" :name="'card' + index" :item="item"></card>
    </div>
    <div v-if="!items.length">
      <card v-if="!items.length" :item="emptyCard"></card>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {CardBoardModel} from '@/components/common/tables/card-board-model';
  import ImageView from '@/components/common/image-view.vue';
  import Card from '@/components/common/tables/card.vue';

  @Component({
    name: 'card-board',
    components: {
      ImageView,
      Card
    }
  })
  export default class CardBoard extends Vue {
    private readonly emptyCard: CardBoardModel = {
      title: 'EMPTY_LIST',
      description: '',
      imgSrc: ''
    };

    @Prop()
    items: CardBoardModel[];
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/media";

  .tyr-card-board {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .tyr-card {
      width: calc(100% / 5);
      overflow: hidden;

      @include media-lg() {
        & {
          width: calc(100% / 4);
        }
      }

      @include media-md {
        & {
          width: calc(100% / 3);
        }
      }

      @include media-sm {
        & {
          width: calc(100% / 2);
        }
      }
    }
  }

</style>
