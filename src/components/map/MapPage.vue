<template>
  <div id="map-page">
    <button class="overlay-item" v-if="!isRecording" v-on:click="recordPath">Record</button>
    <button class="overlay-item" v-if="isRecording" v-on:click="stopRecording">Stop recording</button>
    <select class="overlay-item" v-model="country">
      <option v-for="country in countries.features" v-bind:value="country['id']">{{country.properties.name}}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import VectorSource from 'ol/source/Vector';
  import Countries from "../../assets/geojson/countries.json";
  import {FeatureCollection} from "geojson";
  import {GeoJSON} from "ol/format";

  @Component
  export default class MapPage extends Vue {
    source: VectorSource = new VectorSource({
      features: (new GeoJSON()).readFeatures(Countries)
    });
    countries: FeatureCollection = Countries as FeatureCollection;
    country: string = '';
    isRecording = false;

    recordPath() {
    }

    stopRecording() {
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
  }
</style>
