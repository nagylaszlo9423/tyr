import { AxiosApi } from 'tyr-api';
import {Http} from '@/services/http.service';

export const pathService = new AxiosApi.PathApi(undefined, '', Http.axios);
export const groupService = new AxiosApi.GroupApi(undefined, '', Http.axios);
