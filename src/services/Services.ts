import {AxiosApi} from 'tyr-api';
import {Configuration} from 'tyr-api/types/axios';
import {Http} from '@/services/HttpService';

const axiosConfig: Configuration = {
  basePath: '/api'
};

export const routeService = new AxiosApi.RouteApi(axiosConfig, undefined, Http.axios());
export const groupService = new AxiosApi.GroupApi(axiosConfig, undefined, Http.axios());
