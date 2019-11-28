import axios from 'axios'
import {AxiosApi} from 'tyr-api';
import {Configuration} from 'tyr-api/types/axios';
import environment from '../environment/environment';


export const configuration: Configuration = {
  basePath: `${environment.backend_url}:${environment.backend_port}`
};

export const routeService = new AxiosApi.RouteApi(configuration, undefined, axios);
export const groupService = new AxiosApi.GroupApi(configuration, undefined, axios);
