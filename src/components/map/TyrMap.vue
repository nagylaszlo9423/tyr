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
  import {eventBus} from '@/services/EventBus';
  import {LocationNavigator} from './LocationNavigator';
  import {PositionMarker} from './features/PositionMarker';
  import {PathRecorder} from './plugins/PathRecorder';
  import {Events} from '@/components/Events';

  @Component
  export default class TyrMap extends Vue implements ComponentOptions<TyrMap> {
    private trackPosition = true;
    private positionMarker: PositionMarker;
    private nav: LocationNavigator;
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
      eventBus.$offOn(Events.map.mapPage.recordPath, () => this.pathRecorder.recordPath());
      eventBus.$offOn(Events.map.mapPage.stopRecordingPath, () => {
        eventBus.$emit(Events.map.tyrMap.stoppedRecording, this.pathRecorder.stopRecordingPath());
      });
      eventBus.$offOn(Events.map.mapPage.recenter, () => this.nav.getPosition().subscribe(this.goToPosition, error => console.error(error)));
    }

    mounted() {
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
      this.nav = new LocationNavigator();
      this.nav.getPosition().subscribe(position => {
        this.goToPosition(position);
        this.positionMarker = new PositionMarker(position);
        this.map.addLayer(this.positionMarker.createVectorLayer());
      });
      this.watchPosition();
    }

    watchPosition() {
      this.nav.watchPosition().subscribe(this.onPositionChange.bind(this), (error) => {
        if (error === 'TIME_OUT') {
          this.watchPosition();
        }
      });
    }

    onPositionChange(position: Position) {
      this.positionMarker.setPosition(position);
      if (this.trackPosition) {
        this.view.animate({center: fromLonLat([position.coords.longitude, position.coords.latitude])});
      }
    }

    goToPosition(position: Position) {
      this.trackPosition = true;
      this.view.animate({
        center: fromLonLat([position.coords.longitude, position.coords.latitude]),
        zoom: 15
      });
    }
  }
</script>

<style lang="scss" scoped>
</style>
