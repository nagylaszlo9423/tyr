<template>
  <div id="map-page">
    <div class="map-page-controls">
      <floating-action-button class="btn btn-primary overlay-item mr-1" icon="circle" :title="$t('RECORD')" v-if="!isRecording" @click="recordPath">Record</floating-action-button>
      <floating-action-button class="btn btn-primary overlay-item mr-1" icon="stop" :title="$t('RECENTER')" v-if="isRecording" @click="stopRecording">Stop recording</floating-action-button>
      <floating-action-button class="btn btn-primary overlay-item" icon="street-view" :title="$t('STOP_RECORDING')" @click="recenter">Recenter</floating-action-button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {EventBus} from '../../services/EventBus';
  import FloatingActionButton from '../common/FloatingActionButton.vue';

  @Component({
    components: {
      FloatingActionButton
    }
  })
  export default class MapPage extends Vue {
    public static readonly events = {
      recenter: 'tyr-map:recenter',
      recordPath: 'tye-map:record-path',
      stopRecordingPath: 'tyr-map:stop-recording-path'
    };
    isRecording = false;

    async recordPath() {
      if (!this.isRecording) {
        this.isRecording = true;
        EventBus.$emit(MapPage.events.recordPath);
      }
    }

    stopRecording() {
      if (this.isRecording) {
        this.isRecording = false;
        EventBus.$emit(MapPage.events.stopRecordingPath);
      }
    }

    recenter() {
      EventBus.$emit(MapPage.events.recenter);
    }
  }
</script>

<style lang="scss" scoped>
  #map-page {
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;

    * {
      pointer-events: all;
    }

    .map-page-controls {
      position: absolute;
      display: flex;
      right: 0;
      bottom: 0;
    }
  }
</style>
