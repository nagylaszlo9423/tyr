<template>
  <div class="tyr-card d-flex flex-column"
       @mouseenter="isDescriptionClosed = false"
       @mouseleave="isDescriptionClosed=true">
    <image-view class="tyr-card-image" :src="item.imgSrc" fit="frame"></image-view>
    <div class="tyr-card-content d-flex flex-column justify-content-between">
      <span class="tyr-card-title">{{item.title}}</span>
      <div class="tyr-card-controls">
        <button v-for="(control, idx) in item.controls"
                  :key="idx"
                  class="btn btn-outline-secondary"
                  @click="controlClick($event, idx)">
          <font-awesome-icon :icon="control.icon" fixed-width></font-awesome-icon>
          <span class="ml-1">{{control.title}}</span>
        </button>
      </div>
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

    isDescriptionClosed = true;

    controlClick(event: Event, idx: number) {
      if (this.item.controls) {
        this.item.controls[idx].action(this.item.id);
      }
      event.stopPropagation();
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
    min-height: 15rem;
    border-radius: 5px;
    box-shadow: 0 0 5px grey;
    cursor: pointer;

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

      .tyr-card-title {
        margin: .3rem;
      }

      .tyr-card-controls {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;

        :nth-child(1) {
          border-left: 0;
        }

        :nth-child(2n + 1) {
          border-right: 0;
        }

        :nth-child(2n + 2) {
          border-right: 0;
        }

        .btn {
          flex: 1 0 33%;
          border-radius: 0;
          border-bottom: 0;
          padding: .1rem .3rem .1rem .3rem;
        }

        svg, span {
          font-size: .8rem;
        }
      }
    }
  }
</style>
