import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Geometry from 'ol/geom/Geometry';
import LineString from 'ol/geom/LineString';
import {MapHelper} from '../MapHelper';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';


export class Path extends Feature {
  path: LineString;

  constructor(options?: Geometry | { [key: string]: any }) {
    super(options);
    this.path = new LineString([]);
    this.setGeometry(this.path);
    this.setStyle(new Style({
      stroke: new Stroke({
        color: '#FF0000',
        width: 2
      })
    }))
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
    console.log(JSON.stringify(this.path.getCoordinates()));
  }

}
