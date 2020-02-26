import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Geometry from 'ol/geom/Geometry';
import LineString from 'ol/geom/LineString';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import {MapHelper} from '@/components/map/map-helper';
import Fill from 'ol/style/Fill';
import CircleStyle from 'ol/style/Circle';


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

  get lineString(): LineString {
    return this.path;
  }

  createVectorLayer(): VectorLayer {
    return new VectorLayer({
      source: new VectorSource({
        features: [this]
      }),
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33'
          })
        })
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
