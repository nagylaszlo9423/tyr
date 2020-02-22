<template>
  <div class="tyr-card d-flex flex-column justify-content-center" @mouseenter="isDescriptionClosed = false" @mouseleave="isDescriptionClosed=true">
    <image-view :src="item.imgSrc" fit="frame"></image-view>
    <div class="tyr-card-content">
      <h3>{{ item.title }}</h3>
      <div class="tyr-card-description" :class="{closed: isDescriptionClosed}">
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import ImageView from '../image-view.vue';

  @Component({
    components: {
      ImageView
    }
  })
  export default class Card extends Vue {
    @Prop() item: any;

    isDescriptionClosed = true;
  }
</script>

<style lang="scss" scoped>
  .tyr-card {
    position: relative;
    margin: 1rem;
    border-radius: 5px;
    box-shadow: 0 1px 15px grey;

    .tyr-card-content {
      position: absolute;
      bottom: 0;
      padding: 3rem 1rem 1rem 1rem;
      background-image: linear-gradient(#00000000, #FFFFFFFF);
      width: 100%;

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
