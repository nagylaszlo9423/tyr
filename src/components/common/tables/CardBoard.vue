<template>
  <div class="tyr-card-board">
    <card v-for="(item, name, index) in items" :key="index" :name="'card' + index" :item="item"></card>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {CardBoardModel} from './CardBoardModel';
  import ImageView from '../ImageView.vue';
  import Card from './Card.vue';

  @Component({
    name: 'card-board',
    components: {
      ImageView,
      Card
    }
  })
  export default class CardBoard extends Vue {
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
    justify-content: center;

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
