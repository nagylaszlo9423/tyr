import {Point} from 'ol/geom';


export interface TransformableToPoint {
  transformToPoint(): Point;
}
