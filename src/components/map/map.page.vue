import {PathRecodingState} from '@/components/map/path-recoding-state';
import {PathRecodingState} from '@/components/map/path-recoding-state';
import {MapPageState} from '@/components/map/map.routes';
<template>
  <div id="map-page">
    <div class="map-page-controls">
      <floating-action-button class="btn btn-primary overlay-item mr-1" icon="trash-alt" :title="$t('map.DELETE')"
                              v-if="recordingState === pathRecordingStates.EDITING" @click="deleteRecordedPath">
      </floating-action-button>
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
  import FloatingActionButton from '@/components/common/controls/floating-action-button.vue';
  import {Events} from '@/components/events';
  import {PathRecodingState} from '@/components/map/path-recoding-state';
  import {MapPageState} from '@/components/map/map.routes';

  @Component({
    components: {
      FloatingActionButton
    }
  })
  export default class MapPage extends Vue implements ComponentOptions<MapPage> {
    private static mapIsReady = false;
    pathRecordingStates = PathRecodingState;
    recordingState: PathRecodingState = PathRecodingState.NOT_RECORDING;

    created(): void {
      this.onPageState(this.$route.params.state as MapPageState);
      if (!MapPage.mapIsReady) {
        eventBus.$offOn(Events.map.tyrMap.mapReady, async () => {
          MapPage.mapIsReady = true;
          this.onPageState(this.$route.params.state as MapPageState);
        });
      }
      eventBus.$offOn(Events.map.tyrMap.failedEditingPath, () => this.onFailedEditinPath);
    }

    onPageState(state: MapPageState) {
      if (MapPage.mapIsReady) {
        if (state === MapPageState.EDIT) {
          this.recordingState = PathRecodingState.EDITING;
          eventBus.$emit(Events.map.mapPage.editRecordedPath);
        }
      }
    }

    onFailedEditinPath() {
      this.recordingState = PathRecodingState.NOT_RECORDING;
      if (this.$route.path !== '/pages/map') {
        this.$router.push('/pages/map');
      }
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

    deleteRecordedPath() {
      if (this.recordingState === PathRecodingState.EDITING) {
        this.recordingState = PathRecodingState.NOT_RECORDING;
        eventBus.$emit(Events.map.mapPage.deleteRecordedPath);
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
