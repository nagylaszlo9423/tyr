import {Subscription} from 'rxjs';
import {Map} from 'ol';
import {locationService, LocationService} from '@/components/map/location-service';
import {Path} from '@/components/map/features/path';
import {store} from '@/store';


export class PathRecorder {
  private subscription: Subscription;
  private path: Path;

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
    store.commit('auth/setRecordedPath', this.path);
  }
}
