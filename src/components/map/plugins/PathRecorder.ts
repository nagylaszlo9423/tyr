import {Subscription} from 'rxjs';
import {Path} from '../features/Path';
import {Map} from 'ol';
import {LocationNavigator} from '../LocationNavigator';


export class PathRecorder {
  private subscription: Subscription;
  private path: Path;
  private nav: LocationNavigator;

  constructor(private map: Map) {
    this.path = new Path();
  }

  recordPath() {
    this.path = new Path();
    this.subscription = this.nav.watchPosition().subscribe(pos => this.path.setNextPosition(pos));
    this.map.addLayer(this.path.createVectorLayer());
  }

  stopRecordingPath(): Path {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    return this.path;
  }
}
