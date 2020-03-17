import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import LineString from 'ol/geom/LineString';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import CircleStyle from 'ol/style/Circle';
import {Coordinate} from 'ol/coordinate';


export class Path extends Feature {
  private readonly _lineString: LineString;

  constructor(path?: Coordinate[]) {
    super();
    this._lineString = new LineString(path ? path : []);
    this.setGeometry(this._lineString);
    this.setStyle(new Style({
      stroke: new Stroke({
        color: '#FF0000',
        width: 2,
      })
    }));
  }

  get lineString(): LineString {
    return this._lineString;
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
      }),
      zIndex: 1
    });
  }

  setNextPosition(pos: Position) {
    this._lineString.setCoordinates([
      ...this._lineString.getCoordinates(),
      [pos.coords.longitude, pos.coords.latitude]
    ]);
  }

  getStartingCoordinate(): Coordinate {
    return this._lineString.getCoordinates()[0];
  }

  isValid() {
    return this._lineString && this._lineString.getCoordinates() && this._lineString.getCoordinates().length > 1;
  }
}
