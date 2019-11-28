<template>
  <div id="map-page">
    <div class="map-page-controls">
      <floating-action-button class="btn btn-primary overlay-item mr-1" icon="save" @click="saveModal.open()"></floating-action-button>
      <floating-action-button class="btn btn-primary overlay-item mr-1" icon="circle" :title="$t('RECORD')" v-if="!isRecording" @click="recordPath">Record</floating-action-button>
      <floating-action-button class="btn btn-primary overlay-item mr-1" icon="stop" :title="$t('RECENTER')" v-if="isRecording" @click="stopRecording">Stop recording</floating-action-button>
      <floating-action-button class="btn btn-primary overlay-item" icon="street-view" :title="$t('STOP_RECORDING')" @click="recenter">Recenter</floating-action-button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {eventBus} from '../../services/EventBus';
  import FloatingActionButton from '../common/FloatingActionButton.vue';
  import {Vue} from '../../Types';
  import {ComponentOptions} from 'vue';
  import TyrMap from './TyrMap.vue';
  import {Path} from './features/Path';
  import LineString from 'ol/geom/LineString';

  @Component({
    components: {
      FloatingActionButton
    }
  })
  export default class MapPage extends Vue implements ComponentOptions<MapPage> {
    public static readonly events = {
      recenter: 'tyr-map:recenter',
      recordPath: 'tye-map:record-path',
      stopRecordingPath: 'tyr-map:stop-recording-path'
    };

    isRecording = false;

    created(): void {
      eventBus.$offOn(TyrMap.events.stoppedRecording, (path: Path) => {
        this.$store.commit('route/setRecordedRoute', path);
        this.$router.push({
          path: '/pages/route/edit',
          query: {
            path: (path.getGeometry() as LineString).getCoordinates()
          }
        });
      });
    }

    async recordPath() {
      if (!this.isRecording) {
        this.isRecording = true;
        eventBus.$emit(MapPage.events.recordPath);
      }
    }

    stopRecording() {
      if (this.isRecording) {
        this.isRecording = false;
        eventBus.$emit(MapPage.events.stopRecordingPath);
      }
    }

    recenter() {
      eventBus.$emit(MapPage.events.recenter);
    }

    savePath() {

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
