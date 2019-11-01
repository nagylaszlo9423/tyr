import {Feature} from "ol";
import {fromLonLat} from "ol/proj";
import {Coordinate} from "ol/coordinate";
import {LocationNavigator} from './LocationNavigator';
import {Observable, of, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';


export class PathRecorder {
  private path: Coordinate[];
  private nav: LocationNavigator;

  record(): Observable<Coordinate[]> {
    this.path = [];
    this.nav = new LocationNavigator();
    return this.nav.watchPosition().pipe(map(pos => this.onPositionReceived(pos)));
  }

  private onPositionReceived(position: Position): Coordinate[] {
    const nextPos = fromLonLat([position.coords.longitude, position.coords.latitude]);
    this.path.push(nextPos);
    return this.path;
  }
}
