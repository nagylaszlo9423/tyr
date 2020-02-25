import {Observable, Subject} from 'rxjs';
import {finalize} from 'rxjs/operators';


export class LocationService {
  private static readonly options: PositionOptions = {
    timeout: 20000,
    maximumAge: 60000,
    enableHighAccuracy: true
  };
  private static _instance: LocationService;
  private watchSubject: Subject<Position>;
  private watchId: number;

  private constructor() {
    this.init();
  }

  private init() {
    this.watchSubject = new Subject<Position>();
    new Observable<Position>(subscriber => {
      if (navigator.geolocation) {
        this.watchId = navigator.geolocation.watchPosition(
          position => {
            subscriber.next(position);
          },
          error => {
            subscriber.error(this.onPositionError(error));
          },
          LocationService.options);
      } else {
        subscriber.error('NAVIGATION_UNAVAILABLE');
      }
      return () => navigator.geolocation.clearWatch(this.watchId);
    }).pipe(finalize(this.init.bind(this)))
      .subscribe(this.watchSubject);
  }

  static get instance() {
    return this._instance ? this._instance : this._instance = new LocationService();
  }

  watchPosition(): Observable<Position> {
    return this.watchSubject;
  }

  getPosition(): Observable<Position> {
    return new Observable<Position>(subscriber => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          subscriber.next(position);
        }, error => {
          subscriber.error(this.onPositionError(error));
        }, LocationService.options);
      } else {
        subscriber.error('NAVIGATION_UNAVAILABLE');
      }
    });
  }

  isLocationAvailable(): boolean {
    return !!navigator.geolocation;
  }

  private onPositionError(positionError: PositionError): string {
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

export const locationService: LocationService = LocationService.instance;
