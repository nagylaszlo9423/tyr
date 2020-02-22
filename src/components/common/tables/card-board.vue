<template>
  <div class="tyr-card-board">
    <div v-if="items.length">
      <div v-for="(item, index) in items_"
           :key="index"
           class="tyr-card"
           @click="cardClick(item.id)">
        <slot v-bind:item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import ImageView from '@/components/common/image-view.vue';
  import Card from '@/components/common/tables/card.vue';

  const path = require('path');

  @Component({
    name: 'card-board',
    components: {
      ImageView,
      Card
    }
  })
  export default class CardBoard extends Vue {
    @Prop() items: any[];
    @Prop() itemNavigationPath: string;

    items_: any[] = [];

    cardClick(id: string) {
      if (id) {
        this.$router.push(path.join(this.itemNavigationPath, id));
      }
    }

    @Watch('items')
    watchItems(items: any[]) {
      items.forEach(item => console.log(JSON.stringify(item)));
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
    justify-content: space-between;

    .tyr-card {
      overflow: hidden;
      position: relative;
      margin: 1rem;
      border-radius: 5px;
      box-shadow: 0 1px 15px grey;
      padding: .5rem;
      cursor: pointer;
    }
  }

</style>
