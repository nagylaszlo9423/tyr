import VectorLayer from 'ol/layer/Vector';
import {Cluster} from 'ol/source';
import VectorSource from 'ol/source/Vector';
import {diffOfFirstArray, rescaleExtent} from '@/utils/utils';
import {ClusterPoint} from '@/components/map/features/cluster-point';
import {Path} from '@/components/map/features/path';
import {Style} from 'ol/style';
import {FeatureLike} from 'ol/Feature';
import {Select} from 'ol/interaction';
import {Map} from 'ol';
import {doubleClick, singleClick} from 'ol/events/condition';
import {SelectEvent} from 'ol/interaction/Select';
import {extend, Extent} from 'ol/extent';


export class ClusteredPathsLayer extends VectorLayer {
  private vectorSource: VectorSource;
  private cluster: Cluster;
  private singleClickSelect: Select;
  private doubleClickSelect: Select;

  private constructor(private map: Map,
                      cluster: Cluster,
                      vectorSource: VectorSource) {
    super({
      source: ClusteredPathsLayer.initCluster(vectorSource),
      style: ClusteredPathsLayer.styleFunction
    });
    this.cluster = cluster;
    this.vectorSource = vectorSource;
    this.addSingleClickListener();
    this.addDoubleClickListener();
  }

  set points(points: ClusterPoint<Path>[]) {
    const loadedPaths: ClusterPoint<Path>[] = this.vectorSource.getFeatures() as ClusterPoint<Path>[];
    diffOfFirstArray(loadedPaths, points, ClusterPoint.equals).forEach(_ => this.vectorSource.removeFeature(_));
    diffOfFirstArray(points, loadedPaths, ClusterPoint.equals).forEach(_ => this.vectorSource.addFeature(_));
  }

  get points() {
    return this.getSource().getFeatures() as ClusterPoint<Path>[];
  }

  public static create(map: Map): ClusteredPathsLayer {
    const vectorSource = new VectorSource({features: []});
    return new ClusteredPathsLayer(
      map,
      this.initCluster(vectorSource),
      vectorSource);
  }

  private addSingleClickListener() {
    this.singleClickSelect = new Select({
      condition: singleClick,
      style: f => {
        if (f) {
          const features = f.get('features') as FeatureLike[];
          if (features.length > 1) {
            return [ClusterPoint.getPointStyle(features ? features.length : undefined, 1.3)];
          }
        }

        return false as any;
      }
    });
    this.singleClickSelect.addEventListener('select', (event) => this.onSingleClick(event as SelectEvent));
    this.map.addInteraction(this.singleClickSelect);
  }

  private onSingleClick(e: SelectEvent): boolean {
    return false;
  }

  private addDoubleClickListener() {
    this.doubleClickSelect = new Select({
      condition: doubleClick,
      style: false as any
    });
    this.doubleClickSelect.addEventListener('select', (event) => this.onDoubleClick(event as SelectEvent));
    this.map.addInteraction(this.doubleClickSelect);
  }

  private onDoubleClick(e: SelectEvent): boolean {
    const features = e.selected[0].get('features') as ClusterPoint<any>[];

    if (features) {
      let extent = features.reduce((extent: Extent, feature: ClusterPoint<any>) => {
        return extend(extent, feature.getOriginalFeature().getGeometry().getExtent() || []);
      }, features[0].getOriginalFeature().getGeometry().getExtent());

      extent = rescaleExtent(extent, 1.01);

      if (extent.length > 0) {
        this.map.getView().fit(extent);
      }
    }

    return false;
  }

  private static styleFunction(feature: FeatureLike): Style {
    const features = feature.get('features') as ClusterPoint<any>[];
    const size = features.length;

    if (size > 1) {
      return ClusterPoint.getPointStyle(size);
    } else {
      return features[0].getOriginalStyle();
    }
  }

  private static initCluster(vectorSource: VectorSource): Cluster {
    return new Cluster({
      distance: 40,
      source: vectorSource
    });
  }
}
