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
</style>
