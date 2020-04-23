import {Feature, Map} from 'ol';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {TransformableToPoint} from '@/components/map/features/transformable-to-point';
import {Options} from 'ol/style/Style';


export class ClusterPoint<T extends Feature & TransformableToPoint> extends Feature {
  private _originalFeature: T;

  constructor(feature: T) {
    super(feature.transformToPoint());
    this._originalFeature = feature;
    this.setId(feature.getId());
  }

  static getPointStyle(size?: number, scaleMultiplier?: number): Style {
    let scale = 1;

    if (size) {
      scale = size.toString().length * (scaleMultiplier || 1);
    }

    const styleConfig: Options = {
      image: new Icon({
        src: require('../../../assets/images/empty-location-pin.png'),
        scale: 0.03 * scale,
        rotateWithView: true
      })
    };

    if (size) {
      styleConfig.text = new Text({
        text: size.toString(),
        font: '11px roboto',
        offsetY: -2.5 * scale,
        fill: new Fill({
          color: '#ffffff'
        })
      });
    }

    return new Style(styleConfig);
  }

  getOriginalStyle(): Style {
    return new Style({
      geometry: this._originalFeature.getGeometry(),
      stroke: new Stroke({
        color: '#ff0000',
        width: 2
      })
    });
  }

  public getOriginalFeature(): T {
    return this._originalFeature;
  }

  public static equals(p1: ClusterPoint<any>, p2: ClusterPoint<any>): boolean {
    return p1.getId() === p2.getId();
  }
}
