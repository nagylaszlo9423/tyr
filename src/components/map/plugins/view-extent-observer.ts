import {Map, View} from 'ol';
import {Observable} from 'rxjs';
import {GeoFeatureDto} from 'tyr-api/types/axios';
import {EventsKey} from 'ol/events';


export class ViewExtentObserver {
  private view: View;
  private key: EventsKey;
  private callCount = 0;

  constructor(private map: Map) {
    this.view = map.getView();
  }

  watchViewExtent(): Observable<GeoFeatureDto> {
    return new Observable<GeoFeatureDto>(subscriber => {
      this.key = this.map.on('moveend', () => {
        this.callCount++;
        setTimeout(() => {
          this.callCount--;
          if (this.callCount === 0) {
            const extent = this.view.calculateExtent();
            const bottomLeft = [extent[0], extent[1]];
            const topRight = [extent[2], extent[3]];
            const bottomRight = [extent[0], extent[3]];
            const topLeft = [extent[2], extent[1]];
            subscriber.next({
              type: 'Polygon',
              coordinates: [[topLeft, topRight, bottomRight, bottomLeft, topLeft]]
            });
          }
        }, 600);
      });
    });
  }

  stopWatchingViewExtent() {
  }

}
