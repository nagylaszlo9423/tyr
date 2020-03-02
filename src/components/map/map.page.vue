import {MapPageState} from '@/components/map/map.routes';
import {MapPageState} from '@/components/map/map.routes';
<template>
  <div id="map-page">
    <div class="map-page-controls">
      <floating-action-button class="btn btn-primary overlay-item mr-1" icon="trash-alt" :title="$t('map.DELETE')"
                              v-if="recordingState === pathRecordingStates.EDITING" @click="confirmationModal.show()">
      </floating-action-button>
      <floating-action-button class="btn btn-primary overlay-item mr-1" icon="save" :title="$t('map.SAVE')"
                              v-if="recordingState === pathRecordingStates.EDITING" @click="saveRecordedPath">
      </floating-action-button>
      <floating-action-button class="btn btn-primary overlay-item mr-1" icon="circle" :title="$t('map.RECORD')"
                              v-if="recordingState === pathRecordingStates.NOT_RECORDING" @click="startRecordingPath">
        Record
      </floating-action-button>
      <floating-action-button class="btn btn-primary overlay-item mr-1" icon="stop" :title="$t('map.RECENTER')"
                              v-if="recordingState === pathRecordingStates.RECORDING" @click="stopRecordingPath">Stop
        recording
      </floating-action-button>
      <floating-action-button class="btn btn-primary overlay-item" icon="street-view" :title="$t('map.STOP_RECORDING')"
                              @click="recenter">Recenter
      </floating-action-button>
    </div>
    <confirmation-modal ref="confirmationModal" @on-confirmed="deleteRecordedPath"></confirmation-modal>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {Vue} from '@/types';
  import {ComponentOptions} from 'vue';
  import {eventBus} from '@/services/event-bus';
  import FloatingActionButton from '@/components/common/controls/floating-action-button.vue';
  import {events} from '@/services/events';
  import {PathRecodingState} from '@/components/map/path-recoding-state';
  import {MapPageState} from '@/components/map/map.routes';
  import {Map} from 'ol';
  import {PathRecorder} from '@/components/map/plugins/path-recorder';
  import {Coordinate} from 'ol/coordinate';
  import {PathNs} from '@/store/namespaces';
  import ConfirmationModal from '@/components/common/modals/confirmation-modal.vue';

  @Component({
    components: {
      ConfirmationModal,
      FloatingActionButton
    }
  })
  export default class MapPage extends Vue implements ComponentOptions<MapPage> {
    @PathNs.Getter('recordedCoordinates') recordedCoordinates: Coordinate[];
    @PathNs.Getter('modelId') modelId: string;

    private confirmationModal: ConfirmationModal;
    private map: Map;
    private pathRecorder: PathRecorder;
    pathRecordingStates = PathRecodingState;
    recordingState: PathRecodingState = PathRecodingState.NOT_RECORDING;
    mapPageState: MapPageState;

    created(): void {
      this.initWhenMapCreated();
    }

    mounted(): void {
      this.confirmationModal = this.$refs.confirmationModal as ConfirmationModal;
    }

    initWhenMapCreated(): void {
      eventBus.$offOn(events.map.tyrMap.mapIsCreated, async (map: Map) => {
        this.map = map;
        this.pathRecorder = new PathRecorder(map);
        this.mapPageState = this.$route.params.state as MapPageState;
        this.onPageState(this.mapPageState);
      });
      eventBus.$emit(events.map.mapPage.checkMap);
    }

    onPageState(state: MapPageState) {
      if (state === MapPageState.EDIT) {
        this.recordingState = PathRecodingState.EDITING;
        this.editRecordedPath();
      } else {
        this.goToBaseMapPage();
      }
    }

    async editRecordedPath() {
      const coordinates: Coordinate[] = this.recordedCoordinates;
      this.pathRecorder.setPath(coordinates);
      if (!this.pathRecorder.isValidPath()) {
        this.deleteRecordedPath();
      }
      this.pathRecorder.enablePathEditing();
    }

    deleteRecordedPath() {
      this.pathRecorder.deleteRecordedPath();
      this.recordingState = PathRecodingState.NOT_RECORDING;
      this.goToBaseMapPage();
    }

    startRecordingPath() {
      if (this.recordingState === PathRecodingState.NOT_RECORDING) {
        this.recordingState = PathRecodingState.RECORDING;
        this.pathRecorder.startRecordingPath();
      }
    }

    stopRecordingPath() {
      if (this.recordingState === PathRecodingState.RECORDING) {
        this.recordingState = PathRecodingState.EDITING;
        this.pathRecorder.stopRecordingPath();
        if (!this.pathRecorder.isValidPath()) {
          this.deleteRecordedPath();
        }
      }
    }

    saveRecordedPath() {
      if (this.recordingState === PathRecodingState.EDITING) {
        this.recordingState = PathRecodingState.NOT_RECORDING;
        this.pathRecorder.saveRecordedPath();
        if (this.mapPageState === MapPageState.EDIT && this.modelId) {
          this.$router.push(`/pages/paths/edit/${this.modelId}`);
        } else {
          this.$router.push('/pages/paths/new');
        }
      }
    }

    recenter() {
      eventBus.$emit(events.map.mapPage.recenter);
    }

    goToBaseMapPage() {
      if (this.$route.path.indexOf('/pages/map') === -1) {
        this.$router.push('/pages/map');
      }
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
