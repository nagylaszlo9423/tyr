import { AxiosRequestConfig } from 'axios';
import {Environment} from '@/environment/environment';

export const axiosConfig: AxiosRequestConfig = {
  baseURL: Environment.api_path
};
