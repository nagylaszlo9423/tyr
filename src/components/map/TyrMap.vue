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
  import {Icon, Style} from 'ol/style';
  import VectorLayer from 'ol/layer/Vector';
  import {ComponentOptions} from 'vue';
  import {EventBus} from '../../services/EventBus';
  import MapPage from './MapPage.vue';
  import {LocationNavigator} from './LocationNavigator';
  import {PositionMarker} from './features/PositionMarker';

  @Component
  export default class TyrMap extends Vue implements ComponentOptions<TyrMap> {
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
    private currentPosition: PositionMarker;
    private locationHeadingStyle = new Style({
      image: new Icon({
        src: 'direction.svg',
        imgSize: [27, 27],
        rotateWithView: true
      })
    });
    private locationHeadingVectorLayer = new VectorLayer({
      style: this.locationHeadingStyle
    });

    constructor() {
      super();
      this.nav = new LocationNavigator();
    }

    created(): void {
      EventBus.$off(MapPage.events.recenter);
      EventBus.$on(MapPage.events.recenter, () => this.nav.getPosition().subscribe((position) => this.goToPosition(position), error => console.log(error)));
    }

    mounted() {
      this.map = new Map({
        target: 'tyr-map',
        layers: [this.layer],
        view: this.view,
        controls: []
      });
      this.nav.getPosition().subscribe(position => {
        this.goToPosition(position);
        this.currentPosition = new PositionMarker(position);
        this.map.addLayer(this.currentPosition.createVectorLayer())
      });
      this.nav.watchPosition().subscribe(this.onPositionChange.bind(this));
    }

    onPositionChange(position: Position) {
      this.currentPosition.setPosition(position);
    }

    goToPosition(position: Position) {
      this.view.animate({
        center: fromLonLat([position.coords.longitude, position.coords.latitude]),
        zoom: 15
      });
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
