import {Route} from '../../models/Route';
import {RouteResponse} from '../dtos/route/RouteResponse';


export class RouteMapper {
  static responseToModel(response: RouteResponse): Route {
    return new Route();
  }
}
