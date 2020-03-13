<template>
  <div class="tyr-progress-bar" :class="{hidden: !show}"></div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

  @Component
  export default class TyrProgressBar extends Vue {
    @Prop({type: Boolean, default: false}) show: boolean;

    @Watch('show')
    watchShow(value: boolean) {
      console.log('itt', value, this.show);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/variables";

  .tyr-progress-bar {
    height: 0.3rem;
    width: 100%;
    background: linear-gradient(to right, $background 25%, $primary 40%, $primary 60%, $background 75%);
    animation: progress 3s linear infinite;

    &.hidden {
      display: none;
    }
  }

  @keyframes progress {
    0% {
      background-position-x: 0;
    }

    100% {
      background-position-x: 100vw;
    }
  }
</style>
