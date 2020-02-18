<template>
  <div class="t-page">
    <div class="t-page-title">
      <font-awesome-icon v-if="icon" class="fa-1x" fixed-width :icon="icon"></font-awesome-icon>
      <span v-if="title">{{title}}</span>
    </div>
    <div class="t-page-content container-fluid">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'page'
  })
  export default class Page extends Vue {
    @Prop() title: string;
    @Prop() icon: string
  }
</script>

<style lang="scss">
  @import "../../style/media";

  $title-font-size: .6rem;

  .t-page {
    position: relative;
    border: solid #CCCCCC 1px;
    border-radius: 5px;
    box-shadow: 0 0 3px #AAAAAA;
    padding: .3rem .5rem .6rem .5rem;
    background: white;
    margin-top: $title-font-size*2;

    .t-page-title {
      span {
        font-size: $title-font-size;
      }
    }

    @include media-md() {

    }

    @include media-lg() {

    }
  }
</style>
