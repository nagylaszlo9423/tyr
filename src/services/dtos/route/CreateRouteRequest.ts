import {LineStringDto} from '../geojson/LineStringDto';

export class CreateRouteRequest {
  title: string;
  description: string;
  path: LineStringDto;
}
