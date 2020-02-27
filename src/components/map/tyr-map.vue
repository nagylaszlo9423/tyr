<template>
  <div id="tyr-map"></div>
</template>

<script lang="ts">
  import 'ol/ol.css';
  import {Map, View} from 'ol';
  import TileLayer from 'ol/layer/Tile';
  import {OSM} from 'ol/source';
  import {Component, Vue} from 'vue-property-decorator';
  import {fromLonLat} from 'ol/proj';
  import {ComponentOptions} from 'vue';
  import {locationService} from '@/components/map/location-service';
  import {PathRecorder} from '@/components/map/plugins/path-recorder';
  import {eventBus} from '@/services/event-bus';
  import {Events} from '@/components/events';
  import {PositionMarker} from '@/components/map/features/position-marker';
  import LineString from 'ol/geom/LineString';
  import {Coordinate} from 'ol/coordinate';

  @Component
  export default class TyrMap extends Vue implements ComponentOptions<TyrMap> {
    private trackPosition = true;
    private positionMarker: PositionMarker;
    private pathRecorder: PathRecorder;

    private map: Map;
    private view: View = new View({
      center: [0, 0],
      zoom: 1
    });
    private layer: TileLayer = new TileLayer({
      source: new OSM(),
      preload: Infinity
    });

    created(): void {
    }

    async mounted() {
      this.map = new Map({
        target: 'tyr-map',
        layers: [this.layer],
        view: this.view,
        controls: []
      });
      this.map.on('pointerdrag', () => {
        this.trackPosition = false;
      });
      this.pathRecorder = new PathRecorder(this.map);

      this.goToPositionAndSetMarker();
      this.watchPosition();
      this.registerEvents();
      eventBus.$emit(Events.map.tyrMap.mapReady);
    }

    registerEvents() {
      eventBus.$offOn(Events.map.mapPage.recordPath, () => this.pathRecorder.recordPath());
      eventBus.$offOn(Events.map.mapPage.stopRecordingPath, () => this.pathRecorder.stopRecordingPath());
      eventBus.$offOn(Events.map.mapPage.saveRecordedPath, () => this.pathRecorder.saveRecordedPath());
      eventBus.$offOn(Events.map.mapPage.recenter, () => locationService.getPosition().subscribe(this.goToPosition, this.handleError.bind(this)));
      eventBus.$offOn(Events.map.mapPage.editRecordedPath, () => this.editRecordedPath());
      eventBus.$offOn(Events.map.mapPage.deleteRecordedPath, () => this.deleteRecordedPath());
    }

    goToPositionAndSetMarker() {
      locationService.getPosition().subscribe(position => {
        this.goToPosition(position);
        this.positionMarker = new PositionMarker(position);
        this.map.addLayer(this.positionMarker.createVectorLayer());
      });
    }

    watchPosition() {
      locationService.watchPosition().subscribe(this.onPositionChange.bind(this), (error) => {
        if (error === 'TIME_OUT') {
          this.watchPosition();
        }
      });
    }

    async editRecordedPath() {
      const coordinates: Coordinate[] = await this.$store.getters['route/recordedPath'];
      const lineString: LineString = new LineString(coordinates);
      this.pathRecorder.setPath(lineString);
      this.pathRecorder.enablePathEditing();
      if (!this.pathRecorder.isValidPath()) {
        eventBus.$emit(Events.map.tyrMap.failedEditingPath);
      }
    }

    onPositionChange(position: Position) {
      this.positionMarker.setPosition(position);
      if (this.trackPosition) {
        this.view.animate({center: fromLonLat([position.coords.longitude, position.coords.latitude])});
      }
    }

    deleteRecordedPath() {
      this.pathRecorder.deleteRecordedPath();
    }

    goToPosition(position: Position) {
      this.trackPosition = true;
      this.view.animate({
        center: fromLonLat([position.coords.longitude, position.coords.latitude]),
        zoom: 15
      });
    }

    handleError(error: string) {
      this.$toasted.error(this.$tc(`errors.${error}`));
    }
  }
</script>

<style lang="scss" scoped>
</style>
