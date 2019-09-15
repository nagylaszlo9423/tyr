import {Feature} from "ol";
import {fromLonLat} from "ol/proj";
import {Coordinate} from "ol/coordinate";
import {MultiLineString} from "ol/geom";


export class PathRecorder {
    private route: Feature;
    private path: Coordinate[][];
    private watchId: number = -1;

    constructor(private position: Position) {
        const pos = fromLonLat([position.coords.longitude, position.coords.latitude]);
        this.path = [[pos, pos]];
        this.route = new Feature();
    }

    record() {
        this.watchId = navigator.geolocation.watchPosition(this.onPositionReceived.bind(this), positionError => new Error(positionError.message), {enableHighAccuracy: true});
    }

    stop(): Feature {
        if (this.watchId !== -1) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = -1;
        }
        return new Feature(new MultiLineString(this.path));
    }

    onPositionReceived(position: Position) {
        this.path.push([
            this.path[this.path.length -1][1],
            fromLonLat([position.coords.longitude, position.coords.latitude])
        ]);
    }
}
