<template>
  <div id="tyr-map"></div>
</template>

<script lang="ts">
  import 'ol/ol.css';
  import {Map, View} from "ol";
  import TileLayer from "ol/layer/Tile";
  import {OSM} from "ol/source";
  import {Component, Vue} from "vue-property-decorator";

  @Component
  export default class TyrMap extends Vue {
    position = [0, 0];
    map: Map = new Map({});

    mounted() {
      this.map = new Map({
        target: 'tyr-map',
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 0
        })
      });
      navigator.geolocation.watchPosition(positionSuccess.bind(this, this.map), positionError => {
        switch (positionError.code) {
          case 0:
            console.error('Unknown error');
            break;
          case 1:
            console.error('Permission denied');
            break;
          case 2:
            console.error('Position unavailable');
            break;
          case 3:
            console.error('Timed out');
            break;
        }
      }, {
        timeout: 10000,
        maximumAge: 60000
      });
    }
  }

  function positionSuccess(map: Map, position: Position) {
    console.log(position.coords);
    map.setView(new View({
      center: [position.coords.longitude, position.coords.latitude],
      zoom: 10
    }));
  }
</script>

<style scoped>
  #tyr-map {
    width: 100%;
    height: 100%;
  }
</style>
