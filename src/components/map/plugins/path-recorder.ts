import {Subscription} from 'rxjs';
import {Map} from 'ol';
import {locationService} from '@/components/map/location-service';
import {Path} from '@/components/map/features/path';
import {store} from '@/store';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Snap from 'ol/interaction/Snap';
import Select from 'ol/interaction/Select';
import Modify from 'ol/interaction/Modify';
import {doubleClick} from 'ol/events/condition';
import {Coordinate} from 'ol/coordinate';

export class PathRecorder {
  private subscription: Subscription;
  private path: Path;
  private pathLayer: VectorLayer;
  private source: VectorSource;
  private snap: Snap;
  private select: Select;
  private modify: Modify;

  constructor(private map: Map) {
    this.path = new Path();
  }

  setPath(path: Coordinate[]) {
    this.path = new Path(path);
    this.pathLayer = this.path.createVectorLayer();
    this.map.addLayer(this.pathLayer);
  }

  startRecordingPath() {
    this.path = new Path();
    this.pathLayer = this.path.createVectorLayer();
    this.subscription = locationService.watchPosition().subscribe(pos => {
      console.log('pos', pos);
      this.path.setNextPosition(pos);
    });
    this.map.addLayer(this.pathLayer);
  }

  stopRecordingPath() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.enablePathEditing();
  }

  enablePathEditing() {
    this.source = this.pathLayer.getSource();
    this.snap = new Snap({source: this.source});
    this.select = new Select();
    this.modify = new Modify({source: this.source, deleteCondition: event => doubleClick(event)});

    this.map.addInteraction(this.modify);
    this.map.addInteraction(this.snap);
    this.map.addInteraction(this.select);
  }

  deleteRecordedPath() {
    this.disablePathEditing();
    store.dispatch('path/deleteRecordedPath');
    this.map.removeLayer(this.pathLayer);
  }

  saveRecordedPath() {
    this.disablePathEditing();
    this.map.removeLayer(this.pathLayer);
    store.commit('path/setRecordedPath', this.path.lineString.getCoordinates());
  }

  disablePathEditing() {
    this.map.removeInteraction(this.modify);
    this.map.removeInteraction(this.snap);
    this.map.removeInteraction(this.select);
  }

  isValidPath(): boolean {
    return this.path.isValid();
  }
}
