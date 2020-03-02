<template>
  <div class="tyr-image-view" :class="fit">
    <img :class="{'show-image': !isLoading && isImageVisible}" :src="internalSrc" :alt="alt" @load="onImageLoad">
    <transition name="fade" duration="300ms">
      <div class="image-loading">
        <div v-if="isLoading" class="spinner">
          <cube-loader></cube-loader>
        </div>
      </div>
    </transition>
    <transition name="fade" duration="300ms">
      <div v-if="!isLoading && !isImageVisible" class="image-not-found">
        <h3>Image not found!</h3>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import CubeLoader from '@/components/common/loaders/cube-loader.vue';

  @Component({
    components: {
      CubeLoader
    }
  })
  export default class ImageView extends Vue {
    @Prop() src: string;
    @Prop() alt: string;
    @Prop() fit: 'width'|'height'|'frame';

    isImageVisible: boolean = false;
    isLoading: boolean = true;
    internalSrc: string = this.src;

    @Watch('src')
    onSrcChange(newSrc: string, oldSrc: string) {
      if (newSrc && newSrc.length != 0) {
        this.internalSrc = newSrc;
        if (this.isImageVisible) {
          this.isImageVisible = false;
          this.showSpinner();
        }
      }
      setTimeout(() => this.onImageNotFound(oldSrc), 5000);
    }

    onImageLoad() {
      if (this.internalSrc !== this.src) {
        this.internalSrc = this.src;
      } else {
        this.isImageVisible = true;
        this.hideSpinner();
      }
    }

    onImageNotFound(originalSrc: string) {
      if (originalSrc === this.src && !this.isImageVisible) {
        this.hideSpinner();
        this.internalSrc = '';
      }
    }

    showSpinner() {
      this.isLoading = true;
    }

    hideSpinner() {
      this.isLoading = false;
    }
  }
</script>

<style lang="scss" scoped>
  .tyr-image-view {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
      display: block;
      transition: opacity 300ms;
      opacity: 0;
    }

    .show-image {
      opacity: 1;
    }

    .image-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 100%;

      .spinner {
        position: relative;
        left: -25%;
        top: -5%;
      }
    }

    &.frame {
      img {
        min-height: 100%;
        min-width: 100%;
      }
    }

    &.height {
      img {
        height: 100%;
      }
    }

    &.width {
      img {
        width: 100%;
      }
    }

  }
</style>
