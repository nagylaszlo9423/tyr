import axios, {AxiosResponse, AxiosError, AxiosInstance} from 'axios';
import {enableInterceptor} from './HttpInterceptor';
import {ErrorResponse} from 'tyr-api';
import {Environment} from '@/environment/environment';

const path = require('path');

export interface IHttpService {

  axios(): AxiosInstance;

  get<T>(path: string, params?: { [key: string]: string | number }): Promise<T>

  post<T>(path: string, data?: any, params?: { [key: string]: string | number }): Promise<T>

  put<T>(path: string, data?: any, params?: { [key: string]: string | number }): Promise<T>

  del<T>(path: string, params?: { [key: string]: string | number }): Promise<void>
}

class HttpService implements IHttpService {
  private static _instance: HttpService;
  private readonly _axiosInstance: AxiosInstance;

  private constructor() {
    this._axiosInstance = axios.create({
      baseURL: Environment.api_path
    });
  }

  static get instance(): HttpService {
    if (!HttpService._instance) {
      this._instance = new HttpService();
    }

    return HttpService._instance;
  }

  axios(): AxiosInstance {
    return this._axiosInstance;
  }

  get<T>(path: string, params?: { [key: string]: string | number }): Promise<T> {
    return this.resolveResponse(this._axiosInstance.get<T>(path, {
      params: params
    }));
  }

  post<T>(path: string, data?: any, params?: { [key: string]: string | number }): Promise<T> {
    return this.resolveResponse(this._axiosInstance.post<T>(path, data, {
      params: params
    }));
  }

  put<T>(path: string, data?: any, params?: { [key: string]: string | number }): Promise<T> {
    return this.resolveResponse(this._axiosInstance.put<T>(path, data, {
      params: params
    }));
  }

  del<T>(path: string, params?: { [key: string]: string | number }): Promise<void> {
    return this.resolveResponse(this._axiosInstance.delete<void>(path, {
      params: params
    }));
  }

  private resolveResponse<T>(response: Promise<AxiosResponse<T>>): Promise<T> {
    return response.catch(this.handleError).then(_result => (_result as AxiosResponse).data);
  }

  private handleError(error: AxiosError<ErrorResponse>) {
    if (!error.response) {
      console.error('Unknown error occurred!', error);
      throw new Error('UNKNOWN_ERROR');
    }
    if (error.response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    if (error.response.status === 403) {
      throw new Error('FORBIDDEN');
    }
    if (error.response.status === 404) {
      throw new Error('NOT_FOUND');
    }
    if (error.response.status === 422) {
      throw new Error(error.response.data.cause);
    }

    console.error(`Unknown error occurred! Status: ${error.response.status}`);
    throw new Error('UNKNOWN_ERROR');
  }
}

export const Http: IHttpService = HttpService.instance;
enableInterceptor();
