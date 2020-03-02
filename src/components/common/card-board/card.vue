<template>
  <div class="tyr-card d-flex flex-column"
       @mouseenter="isDescriptionClosed = false"
       @mouseleave="isDescriptionClosed=true">
    <image-view class="tyr-card-image" :src="item.imgSrc" fit="frame"></image-view>
    <div class="tyr-card-content d-flex flex-row justify-content-between">
      <span>{{item.title}}</span>
      <div class="px-2">
        <b-button v-for="(control, idx) in item.controls"
                  :key="idx"
                  variant="primary"
                  class="p-0"
                  @click="controlClick($event, control.route)">
          <font-awesome-icon :icon="control.icon" fixed-width></font-awesome-icon>
        </b-button>
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

    controlClick(event: Event, route: string) {
      this.$router.push(`${route}/${this.item.id}`);
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
    height: 15rem;
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
