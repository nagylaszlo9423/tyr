import axios, {AxiosResponse, AxiosError, AxiosInstance} from 'axios';
import environment from '../environment/environment';
import {interceptRequests} from './HttpInterceptor';
import {ErrorResponse} from 'tyr-api';

const __path = require('path');

interceptRequests();

export interface IHttpService {
  get<T>(path: string, params?: { [key: string]: string | number }): Promise<T>

  post<T>(path: string, data?: any, params?: { [key: string]: string | number }): Promise<T>

  put<T>(path: string, data?: any, params?: { [key: string]: string | number }): Promise<T>

  del<T>(path: string, params?: { [key: string]: string | number }): Promise<void>
}

class HttpService implements IHttpService {
  private static _instance: HttpService | null = null;

  private constructor() {}

  static get instance(): HttpService {
    if (HttpService._instance === null) {
      HttpService._instance = new HttpService();
    }

    return HttpService._instance;
  }

  get<T>(path: string, params?: { [key: string]: string | number }): Promise<T> {
    return this.resolveResponse(axios.get<T>(this.composePath(path), {
      params: params
    }));
  }

  post<T>(path: string, data?: any, params?: { [key: string]: string | number }): Promise<T> {
    return this.resolveResponse(axios.post<T>(this.composePath(path), data, {
      params: params
    }));
  }

  put<T>(path: string, data?: any, params?: { [key: string]: string | number }): Promise<T> {
    return this.resolveResponse(axios.put<T>(this.composePath(path), data, {
      params: params
    }));
  }

  del<T>(path: string, params?: { [key: string]: string | number }): Promise<void> {
    return this.resolveResponse(axios.delete<void>(this.composePath(path), {
      params: params
    }));
  }

  private composePath(path: string): string {
    return __path.join(environment.api_path, path);
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
