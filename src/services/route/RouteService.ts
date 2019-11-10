import {RouteResponse} from '../dtos/route/RouteResponse';
import {get} from '../HttpService';
import {Route} from '../../models/Route';
import {RouteMapper} from './RouteMapper';


export const routeService = {
  async getById(id: string): Promise<Route> {

    return get<RouteResponse>(`/route/${id}`).then(RouteMapper.responseToModel);
  }
};
