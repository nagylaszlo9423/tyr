import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {fromLonLat} from 'ol/proj';
import Geometry from 'ol/geom/Geometry';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

export class PositionMarker extends Feature {
  private prevPoint: Point = new Point([0, 1]);
  private point: Point;
  private style: Style;
  private icon: Icon;

  constructor(position: Position, options?: Geometry | { [key: string]: any }) {
    super(options);
    this.icon = new Icon({
      scale: 0.05,
      crossOrigin: 'anonymous',
      src: require('../../../assets/images/position_marker.png'),
      rotateWithView: true
    });
    this.point = new Point(PositionMarker.positionToCoords(position));
    this.style = new Style({
      image: this.icon
    });
    this.setGeometry(this.point);
    this.setStyle(this.style);
  }

  setPosition(position: Position) {
    this.prevPoint.setCoordinates(this.point.getCoordinates());
    this.point.setCoordinates(PositionMarker.positionToCoords(position));
    const prevCoords = this.prevPoint.getCoordinates();
    const currentCoords = this.point.getCoordinates();
    if (prevCoords[0] !== currentCoords[0] || prevCoords[1] !== currentCoords[1]) {
      this.icon.setRotation(PositionMarker.calcRotation(this.prevPoint.getCoordinates(), this.point.getCoordinates()));
    }
  }

  createVectorLayer(): VectorLayer {
    return new VectorLayer({
      source: new VectorSource({
        features: [this]
      }),
      zIndex: 1000000
    });
  }

  private static calcRotation(pointFrom: any[], pointTo: any[]): number {
    const normalized = PositionMarker.normalize(pointFrom, pointTo);
    return Math.atan2(normalized[1], -1 * normalized[0]);
  }

  private static positionToCoords(position: Position): number[] {
    return fromLonLat([position.coords.longitude, position.coords.latitude]);
  }

  private static normalize(pointFrom: any[], pointTo: any[]): any[] {
    return [
      pointTo[0] - pointFrom[0],
      pointTo[1] - pointFrom[1]
    ];
  }

  private static vectorLength(vectorPoint: any[]): number {
    return Math.sqrt(vectorPoint[0] * vectorPoint[0] + vectorPoint[1] * vectorPoint[1]);
  }
}
