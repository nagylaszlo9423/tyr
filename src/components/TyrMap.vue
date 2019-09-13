<template>
  <div id="tyr-map">
    <select v-model="country">
      <option v-for="country in countries.features" v-bind:value="country['id']">{{country.properties.name}}</option>
    </select>
    <div id="open-layers-map">

    </div>
  </div>
</template>

<script lang="ts">
  import 'ol/ol.css';
  import {Map, View} from "ol";
  import TileLayer from "ol/layer/Tile";
  import {OSM} from "ol/source";
  import {Component, Vue} from "vue-property-decorator";
  import Countries from "../assets/geojson/countries.json";
  import VectorSource from "ol/source/Vector";
  import {FeatureCollection} from "geojson";
  import SimpleGeometry from "ol/geom/SimpleGeometry";
  import {GeoJSON} from "ol/format";
  import {fromLonLat} from "ol/proj";

  @Component
  export default class TyrMap extends Vue {
    position = [0, 0];
    view: View = new View({});
    map: Map = new Map({});
    positionOptions: PositionOptions = {
      timeout: 10000,
      maximumAge: 60000
    };
    source: VectorSource = new VectorSource({
      features: (new GeoJSON()).readFeatures(Countries)
    });
    countries: FeatureCollection = Countries as FeatureCollection;
    _country: string;

    set country(countryId: string) {
      const feature = this.source.getFeatureById(countryId);
      const polygon: SimpleGeometry = (feature.getGeometry()) as SimpleGeometry;
      this.view.fit(polygon, {padding: [170, 50, 30, 150], nearest: true});
    }

    get country(): string {
      return this._country;
    }

    mounted() {
      console.log(Countries);
      console.log(this.countries);
      this.view = new View({
        center: [0, 0],
        zoom: 1
      });
      this.map = new Map({
        target: 'open-layers-map',
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: this.view
      });
      navigator.geolocation.watchPosition(this.positionSuccess, this.positionError, this.positionOptions);
    }

    positionSuccess(position: Position) {
      console.log(position.coords);
      this.view.animate({
        center: fromLonLat([position.coords.longitude, position.coords.latitude]),
        zoom: 10
      });
    }

    positionError(positionError: PositionError) {
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
    }
  }
</script>

<style scoped>
  #tyr-map {
    width: 100%;
    height: 100%;
  }
</style>
