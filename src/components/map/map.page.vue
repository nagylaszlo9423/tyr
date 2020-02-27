<template>
  <div id="map-page">
    <div class="map-page-controls">
      <floating-action-button class="btn btn-primary overlay-item mr-1" icon="save" :title="$t('map.SAVE')"
                              v-if="recordingState === pathRecordingStates.EDITING" @click="saveRecordedPath">
      </floating-action-button>
      <floating-action-button class="btn btn-primary overlay-item mr-1" icon="circle" :title="$t('map.RECORD')"
                              v-if="recordingState === pathRecordingStates.NOT_RECORDING" @click="startRecordingPath">Record
      </floating-action-button>
      <floating-action-button class="btn btn-primary overlay-item mr-1" icon="stop" :title="$t('map.RECENTER')"
                              v-if="recordingState === pathRecordingStates.RECORDING" @click="stopRecordingPath">Stop recording
      </floating-action-button>
      <floating-action-button class="btn btn-primary overlay-item" icon="street-view" :title="$t('map.STOP_RECORDING')"
                              @click="recenter">Recenter
      </floating-action-button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {Vue} from '@/types';
  import {ComponentOptions} from 'vue';
  import {eventBus} from '@/services/event-bus';
  import {Path} from '@/components/map/features/path';
  import FloatingActionButton from '@/components/common/controls/floating-action-button.vue';
  import LineString from 'ol/geom/LineString';
  import {Events} from '@/components/events';
  import {PathRecodingState} from '@/components/map/path-recoding-state';

  @Component({
    components: {
      FloatingActionButton
    }
  })
  export default class MapPage extends Vue implements ComponentOptions<MapPage> {

    pathRecordingStates = PathRecodingState;
    recordingState: PathRecodingState = PathRecodingState.NOT_RECORDING;

    created(): void {
      eventBus.$offOn(Events.map.mapPage.stopRecordingPath, (path: Path) => {
        this.$store.commit('route/setRecordedRoute', path);
        this.$router.push({
          path: '/pages/route/edit',
          query: {
            path: (path.getGeometry() as LineString).getCoordinates()
          }
        });
      });
    }

    startRecordingPath() {
      if (this.recordingState === PathRecodingState.NOT_RECORDING) {
        this.recordingState = PathRecodingState.RECORDING;
        eventBus.$emit(Events.map.mapPage.recordPath);
      }
    }

    stopRecordingPath() {
      if (this.recordingState === PathRecodingState.RECORDING) {
        this.recordingState = PathRecodingState.EDITING;
        eventBus.$emit(Events.map.mapPage.stopRecordingPath);
      }
    }

    saveRecordedPath() {
      if (this.recordingState === PathRecodingState.EDITING) {
        this.recordingState = PathRecodingState.NOT_RECORDING;
        eventBus.$emit(Events.map.mapPage.saveRecordedPath);
        this.$router.push('/pages/routes/edit');
      }
    }

    recenter() {
      eventBus.$emit(Events.map.mapPage.recenter);
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
      padding: 1rem;
    }
  }
</style>
