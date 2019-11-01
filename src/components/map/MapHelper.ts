import {fromLonLat} from 'ol/proj';
import {Coordinate} from 'ol/coordinate';


export class MapHelper {
  static fromLonLat(pos: Position): Coordinate {
    return fromLonLat([pos.coords.longitude, pos.coords.latitude]);
  }
}
