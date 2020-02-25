import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Geometry from 'ol/geom/Geometry';
import LineString from 'ol/geom/LineString';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import {MapHelper} from '@/components/map/map-helper';


export class Path extends Feature {
  private readonly path: LineString;

  constructor(options?: Geometry | { [key: string]: any }) {
    super(options);
    this.path = new LineString([]);
    this.setGeometry(this.path);
    this.setStyle(new Style({
      stroke: new Stroke({
        color: '#FF0000',
        width: 2
      })
    }));
  }

  get lineString() {
    return this.path;
  }

  createVectorLayer(): VectorLayer {
    return new VectorLayer({
      source: new VectorSource({
        features: [this]
      })
    });
  }

  setNextPosition(pos: Position) {
    this.path.setCoordinates([
      ...this.path.getCoordinates(),
      MapHelper.fromLonLat(pos)
    ]);
  }

}
