import VectorLayer from 'ol/layer/Vector';
import {Cluster} from 'ol/source';
import {Path} from '@/components/map/features/path';
import {Feature} from 'ol';
import {Point} from 'ol/geom';
import VectorSource from 'ol/source/Vector';


export class ClusteredPathsLayer extends VectorLayer {
  private _cluster: Cluster;
  private _paths: Path[] = [];

  constructor() {
    super();
    this.initCluster();
    this.setSource(this._cluster);
  }

  initCluster() {
    this._cluster = new Cluster({
      distance: 100,
      geometryFunction: (feature: Feature) => {
        const path = feature as Path;
        console.log('itt');
        return new Point(path.getStartingCoordinate());
      },
      source: new VectorSource({
        features: this._paths
      })
    });
  }

  set paths(paths: Path[]) {
    this._paths = paths;
    this._cluster.clear();
    this._cluster.addFeatures(this._paths);
  }

  get paths() {
    return this._paths;
  }

}
