import {Observable, ReplaySubject, Subject, throwError} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';


export class LocationService {
  private static readonly options: PositionOptions = {
    timeout: 20000,
    maximumAge: 60000,
    enableHighAccuracy: true
  };
  private static _instance: LocationService;
  private positionSubject: Subject<Position>;
  private watchSubject: Subject<Position>;
  private watchId: number;

  private constructor() {
    this.init();
  }

  static get instance() {
    return this._instance ? this._instance : this._instance = new LocationService();
  }

  watchPosition(): Observable<Position> {
    this.ascertainGeolocationAvailability();
    return this.watchSubject;
  }

  getPosition(): Observable<Position> {
    this.ascertainGeolocationAvailability();
    return this.positionSubject;
  }

  private ascertainGeolocationAvailability() {
    if (!this.isGeolocationAvailable()) {
      this.init();
    }
  }

  private init() {
    this.initPositionObservable();
    this.initWatchObservable();
  }

  private initWatchObservable() {
    this.watchSubject = new ReplaySubject<Position>(1);
    new Observable<Position>(subscriber => {
      this.askPermissionForGeolocation().then(isPermitted => {
        if (isPermitted) {
          this.watchId = navigator.geolocation.watchPosition(
            position => {
              subscriber.next(position);
            },
            error => {
              subscriber.error(this.onPositionError(error));
            },
            LocationService.options);
        } else {
          subscriber.error('LOCATION_UNAVAILABLE');
        }
      }).catch(() => {});

      return () => navigator.geolocation.clearWatch(this.watchId);
    }).subscribe(this.watchSubject);
  }

  private initPositionObservable() {
    this.positionSubject = new ReplaySubject<Position>(1);
    this.askPermissionForGeolocation().then(isPermitted => {
      new Observable<Position>(subscriber => {
        if (isPermitted) {
          navigator.geolocation.getCurrentPosition(position => {
            subscriber.next(position);
          }, error => {
            subscriber.error(this.onPositionError(error));
          }, LocationService.options);
        } else {
          subscriber.error('LOCATION_UNAVAILABLE');
        }
      }).subscribe(this.positionSubject);
    });
  }

  private onPositionError(positionError: PositionError): string {
    switch (positionError.code) {
      default:
      case 0:
        return 'UNKNOWN_ERROR';
      case 1:
        return 'PERMISSION_DENIED';
      case 2:
        return 'LOCATION_UNAVAILABLE';
      case 3:
        return 'TIME_OUT';
    }
  }

  isGeolocationAvailable(): boolean {
    return !!navigator.geolocation;
  }

  async askPermissionForGeolocation(): Promise<boolean> {
    const permissionStatus: PermissionStatus = await navigator.permissions.query({name: 'geolocation'});
    return permissionStatus.state === 'granted' || permissionStatus.state === 'prompt';
  }
}

export const locationService: LocationService = LocationService.instance;
