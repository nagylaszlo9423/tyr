<template>
  <div class="compass-loader">
    <div ref="wrapper" class="compass-loader-wrapper" @click="stop" :class="{'compass-loader-background': enableBackground}" :style="style_">
      <div class="compass-loader-body"></div>
      <div class="compass-loader-needle" :class="{loading: loading}"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {eventBus} from '@/services/event-bus';
  import {events} from '@/services/events';

  @Component
  export default class CompassLoader extends Vue implements ComponentOptions<CompassLoader> {
    @Prop({default: 'global'}) id: string;
    @Prop({default: false}) enableBackground: boolean;
    @Prop({default: 5}) size: number;

    loading: boolean = false;
    isLoadingOnEvent: boolean = false;

    counter = 0;
    compassBody = require('../../../assets/images/compass-body.png');
    compassNeedle = require('../../../assets/images/compass-needle.png');

    created(): void {
      eventBus.$offOn(events.loader.start, (id: string) => {
        if (!id || id === this.id && !this.loading) {
          this.loading = this.isLoadingOnEvent= true;
        }
        this.counter++;
      });
      eventBus.$offOn(events.loader.stop, (id: string) => {
        this.counter--;
        if (!id || id === this.id && this.counter === 0) {
          this.isLoadingOnEvent = false;
        }
      });
    }

    mounted(): void {
      const wrapper = this.$refs.wrapper as HTMLElement;
      wrapper.onanimationiteration = this.animationIteration.bind(this);
    }

    stop() {
      this.counter = 0;
      this.loading = false;
    }

    animationIteration() {
      if (!this.isLoadingOnEvent) {
        this.loading = false;
      }
    }

    style_: any = {
      'width': this.size + 'rem',
      'height': this.size + 'rem'
    };
  }
</script>

<style lang="scss">
  .compass-loader {
    .compass-loader-wrapper {
      position: relative;
      overflow: hidden;
      border-radius: 5rem;

      .compass-loader-body, .compass-loader-needle {
        position: absolute;
        top: 0;
        left: 0;
        margin: 5%;
        width: 90%;
        height: 90%;
        background-size: contain;
        background-repeat: no-repeat;
      }

      .compass-loader-body {
        background-image: url("../../../assets/images/compass-body.png");
      }

      .compass-loader-needle {
        background-image: url("../../../assets/images/compass-needle.png");
      }

      .loading {
        animation: spin 2.5s infinite linear;
      }
    }

    .compass-loader-background {
      background: radial-gradient(#f1f3f4 30%, #413c69);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    5% {
      transform: rotate(5deg);
    }

    10% {
      transform: rotate(15deg);
    }

    15% {
      transform: rotate(30deg);
    }

    20% {
      transform: rotate(60deg);
    }

    25% {
      transform: rotate(120deg);
    }

    75% {
      transform: rotate(1455deg);
    }

    80% {
      transform: rotate(1430deg);
    }

    85% {
      transform: rotate(1450deg);
    }

    90% {
      transform: rotate(1435deg);
    }

    95% {
      transform: rotate(1445deg);
    }

    100% {
      transform: rotate(1440deg);
    }
  }
</style>
