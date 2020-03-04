<template>
  <div class="tyr-card d-flex flex-column"
       @mouseenter="isDescriptionClosed = false"
       @mouseleave="isDescriptionClosed=true">
    <image-view class="tyr-card-image" :src="item.imgSrc" fit="frame"></image-view>
    <div class="tyr-card-content d-flex flex-column justify-content-between">
      <span>{{item.title}}</span>
      <div class="align-self-end px-2 mt-1">
        <button v-for="(control, idx) in item.controls"
                  :key="idx"
                  :class="'btn btn-' + (control.variant || 'primary')"
                  class="p-0 mx-1"
                  @click="controlClick(idx)">
          <font-awesome-icon :icon="control.icon" fixed-width></font-awesome-icon>
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

    controlClick(idx: number) {
      if (this.item.controls) {
        this.item.controls[idx].action(this.item.id);
      }
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
      padding: .5rem;

      .tyr-card-description {
        transition: height 300ms;
        height: 5rem;
        overflow: hidden;

        &.closed {
          height: 0;
        }
      }

      button {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  }
</style>
