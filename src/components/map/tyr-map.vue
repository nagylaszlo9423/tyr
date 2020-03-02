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
  import {eventBus} from '@/services/event-bus';
  import {events} from '@/services/events';
  import {PositionMarker} from '@/components/map/features/position-marker';
  @Component
  export default class TyrMap extends Vue implements ComponentOptions<TyrMap> {
    private trackPosition = true;
    private positionMarker: PositionMarker;

    private map: Map;
    private view: View = new View({
      center: [0, 0],
      zoom: 1
    });
    private layer: TileLayer = new TileLayer({
      source: new OSM(),
      preload: Infinity
    });

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

      this.goToPositionAndSetMarker();
      this.watchPosition();
      eventBus.$emit(events.map.tyrMap.mapIsCreated, this.map);
      eventBus.$offOn(events.map.mapPage.checkMap, () => eventBus.$emit(events.map.tyrMap.mapIsCreated, this.map));
      eventBus.$offOn(events.map.mapPage.recenter, () => locationService.getPosition().subscribe(this.goToPosition, this.handleError.bind(this)));
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

    handleError(error: string) {
      this.$toasted.error(this.$tc(`errors.${error}`));
    }
  }
</script>

<style lang="scss" scoped>
</style>
