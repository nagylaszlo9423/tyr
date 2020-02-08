import axios from 'axios';
import {AxiosApi} from 'tyr-api';


export const routeService = new AxiosApi.RouteApi({}, undefined, axios);
export const groupService = new AxiosApi.GroupApi({}, undefined, axios);
