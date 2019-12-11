<template>
  <div class="row d-flex justify-content-center">
    <card-board :items="items"></card-board>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import CardBoard from '../common/tables/CardBoard.vue';
  import {CardBoardModel} from '../common/tables/CardBoardModel';

  @Component({
    components: {
      CardBoard
    }
  })
  export default class Groups extends Vue {
    items: CardBoardModel[];

    constructor() {
      super();
      this.items = [];
      for (let i = 0; i < 10; i++) {
        this.items.push({
          title: 'asdqwe' + i,
          description: 'description' + i,
          imgSrc: 'https://picsum.photos/200/300'
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
