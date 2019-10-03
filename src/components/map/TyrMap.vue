<template>
    <div id="tyr-map"></div>
</template>

<script lang="ts">
    import 'ol/ol.css';
    import {Map, View} from "ol";
    import TileLayer from "ol/layer/Tile";
    import {OSM} from "ol/source";
    import {Component, Vue} from "vue-property-decorator";
    import VectorSource from "ol/source/Vector";
    import {FeatureCollection} from "geojson";
    import SimpleGeometry from "ol/geom/SimpleGeometry";
    import Countries from "../../assets/geojson/countries.json";
    import {GeoJSON} from "ol/format";
    import {fromLonLat} from "ol/proj";
    import {PathRecorder} from "./PathRecorder";
    import {Control} from 'ol/control';

    @Component
    export default class TyrMap extends Vue {
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
        pathRecorder: PathRecorder;
        isRecording = false;

        set country(countryId: string) {
            const feature = this.source.getFeatureById(countryId);
            const polygon: SimpleGeometry = (feature.getGeometry()) as SimpleGeometry;
            this.view.fit(polygon, {padding: [170, 50, 30, 150], nearest: true});
        }

        get country(): string {
            return this._country;
        }

        mounted() {
            const c = new Control({

            });
            this.view = new View({
                center: [0, 0],
                zoom: 1
            });
            this.map = new Map({
                target: 'tyr-map',
                layers: [
                    new TileLayer({
                        source: new OSM()
                    })
                ],
                view: this.view,
                controls: []
            });
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.goToPosition, this.onPositionError, this.positionOptions);
            }
        }

        goToPosition(position: Position) {
            this.view.animate({
                center: fromLonLat([position.coords.longitude, position.coords.latitude]),
                zoom: 15
            });
        }

        recordPath() {
            navigator.geolocation.getCurrentPosition(position => {
                this.pathRecorder = new PathRecorder(position);
                this.pathRecorder.record();
                this.isRecording = true;
            }, this.onPositionError, this.positionOptions);
        }

        stopRecording() {
            this.pathRecorder.stop();
            this.isRecording = false;
        }

        onPositionError(positionError: PositionError) {
            let message = '';
            let variant = 'danger';
            switch (positionError.code) {
                default:
                case 0:
                    message = 'Unknown error';
                    break;
                case 1:
                    message = 'Permission denied';
                    break;
                case 2:
                    message = 'Position unavailable';
                    variant = 'warning';
                    break;
                case 3:
                    message = 'Timed out';
                    variant = 'warning';
                    break;
            }
            this.$bvToast.toast(message, {
                autoHideDelay: 5000,
                appendToast: true,
                variant: variant
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
