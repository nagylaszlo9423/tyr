import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {fromLonLat} from 'ol/proj';
import Geometry from 'ol/geom/Geometry';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';


export class PositionMarker extends Feature {
  private point: Point;
  private style: Style;

  constructor(position: Position, options?: Geometry | { [key: string]: any }) {
    super(options);
    this.point = new Point(PositionMarker.positionToCoords(position));
    this.style = new Style({
      image: new Icon({
        scale: 0.05,
        crossOrigin: 'anonymous',
        src: require('../../../assets/images/position_marker.png'),
        rotateWithView: true
      })
    });
    this.setGeometry(this.point);
    this.setStyle(this.style);
  }

  setPosition(position: Position) {
    this.point.setCoordinates(PositionMarker.positionToCoords(position));
  }

  createVectorLayer(): VectorLayer {
    return new VectorLayer({
      source: new VectorSource({
        features: [this]
      })
    });
  }

  private static positionToCoords(position: Position): number[] {
    return fromLonLat([position.coords.longitude, position.coords.latitude]);
  }
}
