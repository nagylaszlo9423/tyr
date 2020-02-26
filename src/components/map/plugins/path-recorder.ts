import {Observable, Subscription} from 'rxjs';
import {Map} from 'ol';
import {locationService} from '@/components/map/location-service';
import {Path} from '@/components/map/features/path';
import {store} from '@/store';
import {simplifyGeometry} from '@/utils/simplify-geometry';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Snap from 'ol/interaction/Snap';
import Select from 'ol/interaction/Select';
import Modify from 'ol/interaction/Modify';
import {altKeyOnly, doubleClick} from 'ol/events/condition';
import MapBrowserEvent from 'ol/MapBrowserEvent';

export class PathRecorder {
  private subscription: Subscription;
  private path: Path;
  private vector: VectorLayer;
  private source: VectorSource;
  private snap: Snap;
  private select: Select;
  private modify: Modify;

  constructor(private map: Map) {
    this.path = new Path();
  }

  recordPath() {
    this.path = new Path();
    this.subscription = locationService.watchPosition().subscribe(pos => this.path.setNextPosition(pos));
    this.map.addLayer(this.path.createVectorLayer());
  }

  stopRecordingPath() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.enablePathEditing();
    store.commit('route/setRecordedPath', simplifyGeometry(this.path.lineString.getCoordinates(), 1));
  }

  enablePathEditing() {
    this.vector = this.path.createVectorLayer();
    this.source = this.vector.getSource();
    this.snap = new Snap({source: this.source});
    this.select = new Select();
    this.modify = new Modify({source: this.source, deleteCondition: event => doubleClick(event)});

    this.map.addLayer(this.vector);
    this.map.addInteraction(this.modify);
    this.map.addInteraction(this.snap);
    this.map.addInteraction(this.select);
  }

  disablePathEditing() {
    this.map.removeInteraction(this.modify);
    this.map.removeInteraction(this.snap);
    this.map.removeInteraction(this.select);
  }
}
