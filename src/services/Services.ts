import {AxiosApi} from 'tyr-api';
import {Http} from '@/services/HttpService';

export const routeService = new AxiosApi.RouteApi(undefined, '', Http.axios());
export const groupService = new AxiosApi.GroupApi(undefined, '', Http.axios());
