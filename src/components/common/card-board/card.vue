<template>
  <div class="tyr-card d-flex flex-column"
       @click="click"
       @mouseenter="isDescriptionClosed = false"
       @mouseleave="isDescriptionClosed=true">
    <image-view class="tyr-card-image" :src="item.imgSrc" fit="frame"></image-view>
    <div class="tyr-card-content d-flex flex-row">
      <span>{{item.title}}</span>
      <font-awesome-icon v-for="(control, idx) in item.controls" :key="idx" :icon="control.icon" fixed-width @click="controlClick(control.route)"></font-awesome-icon>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import ImageView from '../image-view.vue';
  import {CardItem} from '@/components/common/card-board/card-item';

  @Component({
    components: {
      ImageView
    }
  })
  export default class Card extends Vue {
    @Prop() item: CardItem;
    @Prop() itemDetailsRoute: string;

    isDescriptionClosed = true;

    click() {
      this.$router.push(`${this.itemDetailsRoute}/${this.item.id}`);
    }

    controlClick(route: string) {
      this.$router.push(`${route}/${this.item.id}`);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/media";

  .tyr-card {
    position: relative;
    overflow: hidden;
    margin: 1rem;
    width: 18rem;
    height: 15rem;
    border-radius: 5px;
    box-shadow: 0 0 5px grey;

    @include media-lg {
      & {
        width: 15rem;
        height: 12rem;
      }
    }

    @include media-md {
      & {
        width: 12rem;
        height: 9rem;
      }
    }

    .tyr-card-image {
      position: relative;
    }

    .tyr-card-content {
      position: relative;
      height: 30%;
      padding: .5rem;

      .tyr-card-description {
        transition: height 300ms;
        height: 5rem;
        overflow: hidden;

        &.closed {
          height: 0;
        }
      }
    }
  }
</style>
