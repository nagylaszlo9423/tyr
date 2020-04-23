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
    <b-modal ref="filtersModal" :title="$t('FILTERS')">
      <b-container>
        <b-row class="mb-2">
          <b-col>
            <select-field id="select" v-model="filtersModalData.sortBy" :options="sortOptions" :block="true"
                          first-selected
                          translation-namespace="paths.sortOptions"></select-field>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <multi-select-field v-model="multiSelectItems" block></multi-select-field>
          </b-col>
        </b-row>
      </b-container>
      <template v-slot:modal-footer>
        <b-container>
          <b-row>
            <b-col>
              <b-button variant="secondary" block @click="filtersModal.hide()">{{ $t('CANCEL') }}</b-button>
            </b-col>
            <b-col>
              <b-button variant="primary" block @click="onModalConfirmed">{{ $t('APPLY') }}</b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {eventBus} from '@/services/event-bus';
  import FloatingActionButton from '@/components/common/controls/floating-action-button.vue';
  import {events} from '@/services/events';
  import {PathRecodingState} from '@/components/map/path-recoding-state';
  import {Map} from 'ol';
  import {PathRecorder} from '@/components/map/plugins/path-recorder';
  import {Coordinate} from 'ol/coordinate';
  import {PathNs} from '@/store/namespaces';
  import ConfirmationModal from '@/components/common/modals/confirmation-modal.vue';
  import {MappedActionWithParam} from '@/store/mapped-action';
  import {FindPathsInAreaRequest} from 'tyr-api/types/axios';
  import {ViewExtentObserver} from '@/components/map/plugins/view-extent-observer';
  import {Path} from '@/components/map/features/path';
  import {ClusteredPathsLayer} from '@/components/map/layers/clustered-paths-layer';
  import {ClusterPoint} from '@/components/map/features/cluster-point';
  import {Select} from 'ol/interaction';
  import {click} from 'ol/events/condition';
  import {BvModal} from 'bootstrap-vue';
  import {MapPageType} from '@/components/map/map.routes';
  import {MapPageState} from '@/components/map/map-page.state';
  import {UrlStateManagingVue} from '@/components/common/base/url-state-managing-vue';

  @Component({
    components: {
      ConfirmationModal,
      FloatingActionButton
    }
  })
  export default class MapPage extends UrlStateManagingVue<MapPageState> implements ComponentOptions<MapPage> {
    @PathNs.Getter('recordedCoordinates') recordedCoordinates: Coordinate[];
    @PathNs.Getter('modelId') modelId: string;
    @PathNs.Getter('paths') paths: Path[];
    @PathNs.Action('getAllAvailableByArea') getAllAvailableByArea: MappedActionWithParam<FindPathsInAreaRequest>;

    private map: Map;
    private clickSelect: Select;
    private confirmationModal: ConfirmationModal;
    private filtersModal: BvModal;
    private pathRecorder: PathRecorder;
    private viewExtentObserver: ViewExtentObserver;

    pathRecordingStates = PathRecodingState;
    recordingState: PathRecodingState = PathRecodingState.NOT_RECORDING;
    mapPageState: MapPageType;
    clusteredPathsLayer: ClusteredPathsLayer;

    constructor() {
      super(MapPageState);
    }

    created(): void {
      super.created();
      this.initWhenMapCreated();
    }

    mounted(): void {
      this.confirmationModal = this.$refs.confirmationModal as ConfirmationModal;
      this.filtersModal = this.$refs.filtersModal as BvModal;
    }

    initWhenMapCreated(): void {
      eventBus.$offOn(events.map.tyrMap.mapIsCreated, async (map: Map) => {
        this.map = map;
        this.initSelect();
        this.pathRecorder = new PathRecorder(map);
        this.viewExtentObserver = new ViewExtentObserver(map);
        this.mapPageState = this.$route.params.state as MapPageType;
        this.resolvePageState(this.mapPageState);
      });
      eventBus.$emit(events.map.mapPage.checkMap);
    }

    initSelect() {
      if (this.clickSelect) {
        this.map.removeInteraction(this.clickSelect);
      }

      this.clickSelect = new Select({
        condition: click,
        style: feature => ClusterPoint.getPointStyle(feature.get('features').length)
      });
      this.map.addInteraction(this.clickSelect);
    }

    resolvePageState(state: MapPageType) {
      if (state === MapPageType.EDIT) {
        this.recordingState = PathRecodingState.EDITING;
        this.editRecordedPath();
      } else {
        this.goToBaseMapPage();
        this.showAvailablePaths();
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
        if (this.mapPageState === MapPageType.EDIT && this.modelId) {
          this.$router.push(`/pages/paths/edit/${this.modelId}`);
        } else {
          this.$router.push('/pages/paths/new');
        }
      }
    }

    showAvailablePaths() {
      this.clusteredPathsLayer = ClusteredPathsLayer.create(this.map);
      this.map.addLayer(this.clusteredPathsLayer);
      this.viewExtentObserver.watchViewExtent().subscribe(async feature => {
        await this.getAllAvailableByArea({feature: feature});
        this.clusteredPathsLayer.points = this.paths.map(_ => new ClusterPoint(_));
      });
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
