<template>
  <div id="tyr-map"></div>
</template>

<script lang="ts">
  import 'ol/ol.css';
  import {Map, View} from "ol";
  import TileLayer from "ol/layer/Tile";
  import {OSM} from "ol/source";
  import {Component, Vue} from "vue-property-decorator";
  import {fromLonLat} from "ol/proj";
  import {ComponentOptions} from 'vue';
  import {EventBus} from '../../services/EventBus';
  import MapPage from './MapPage.vue';
  import {LocationNavigator} from './LocationNavigator';
  import {PositionMarker} from './features/PositionMarker';
  import {Subscription} from 'rxjs';
  import {Path} from './features/Path';

  @Component
  export default class TyrMap extends Vue implements ComponentOptions<TyrMap> {
    private subscriptions: {
      pathRecording?: Subscription
    } = {};
    private trackPosition = true;
    private nav: LocationNavigator;
    private map: Map = new Map({});
    private view: View = new View({
      center: [0, 0],
      zoom: 1
    });
    private layer: TileLayer = new TileLayer({
      source: new OSM(),
      preload: Infinity
    });
    private positionMarker: PositionMarker;
    private path: Path;

    constructor() {
      super();
      this.nav = new LocationNavigator();
    }

    created(): void {
      EventBus.$off(MapPage.events.recordPath);
      EventBus.$on(MapPage.events.recordPath, () => this.recordPath());
      EventBus.$off(MapPage.events.stopRecordingPath);
      EventBus.$on(MapPage.events.stopRecordingPath, () => this.stopRecordingPath());
      EventBus.$off(MapPage.events.recenter);
      EventBus.$on(MapPage.events.recenter, () => this.nav.getPosition().subscribe(this.goToPosition, error => console.error(error)));
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
      this.nav.getPosition().subscribe(position => {
        this.goToPosition(position);
        this.positionMarker = new PositionMarker(position);
        this.map.addLayer(this.positionMarker.createVectorLayer())
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
        this.view.animate({center: fromLonLat([position.coords.longitude, position.coords.latitude])})
      }
    }

    goToPosition(position: Position) {
      this.trackPosition = true;
      this.view.animate({
        center: fromLonLat([position.coords.longitude, position.coords.latitude]),
        zoom: 15
      });
    }

    recordPath() {
      this.path = new Path();
      this.subscriptions.pathRecording = this.nav.watchPosition().subscribe(pos => this.path.setNextPosition(pos));
      this.map.addLayer(this.path.createVectorLayer());
    }

    stopRecordingPath() {
      if (this.subscriptions.pathRecording) {
        this.subscriptions.pathRecording.unsubscribe();
      }
    }
  }
</script>

<style lang="scss" scoped>
  #tyr-map {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
</style>
