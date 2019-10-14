import {Observable} from 'rxjs';


export class LocationNavigator {
  private static readonly options: PositionOptions = {
    timeout: 20000,
    maximumAge: 60000,
    enableHighAccuracy: true
  };

  watchPosition(): Observable<Position> {
    return new Observable<Position>(subscriber => {
      let watchId: number = 0;
      if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
          position => {
            subscriber.next(position);
            subscriber.complete();
          },
          error => {
            subscriber.error(this.onPositionError(error));
            subscriber.complete();
          },
          LocationNavigator.options);
      } else {
        subscriber.error('NAVIGATION_UNAVAILABLE');
        subscriber.complete();
      }
      return () => navigator.geolocation.clearWatch(watchId);
    });
  }

  getPosition(): Observable<Position> {
    return new Observable<Position>(subscriber => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          subscriber.next(position);
          subscriber.complete();
        }, error => {
          subscriber.error(this.onPositionError(error));
          subscriber.complete();
        }, LocationNavigator.options);
      } else {
        subscriber.error('NAVIGATION_UNAVAILABLE');
        subscriber.complete();
      }
    });
  }

  onPositionError(positionError: PositionError): string {
    switch (positionError.code) {
      default:
      case 0:
        return 'UNKNOWN_ERROR';
      case 1:
        return 'PERMISSION_DENIED';
      case 2:
        return 'POSITION_UNAVAILABLE';
      case 3:
        return 'TIME_OUT';
    }
  }
}
