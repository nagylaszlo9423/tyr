<template>
  <div class="tyr-progress-bar" :class="{hidden: !show}"></div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class TyrProgressBar extends Vue {
    @Prop({type: Boolean, default: false}) show: boolean;
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/variables";

  .tyr-progress-bar {
    height: 0.3rem;
    width: 100%;
    background: linear-gradient(to right, $background 22%, lighten($primary, 30%) 28%, $primary 72%, $background 78%);
    background-size: 200% 100%;
    animation: progress 2s linear infinite;

    &.hidden {
      display: none;
    }
  }

  @keyframes progress {
    0% {
      background-position-x: 0;
    }

    100% {
      background-position-x: 200vw;
    }
  }
</style>
