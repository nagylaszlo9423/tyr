<template>
  <div class="tyr-card-board row d-flex justify-content-center">
    <div v-for="(item, name, index) in items" class=" col-sm-12 col-md-6 col-lg-4 col-xl-3">
      <card :name="'card' + index" :item="item"></card>
    </div>
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

  .tyr-card-board {
    .tyr-card {
      height: 300px;
    }
  }

</style>
