import axios, { AxiosResponse, AxiosError } from 'axios';
import environment from "../environment/environment";
import {ErrorResponse} from "./dtos/error/ErrorResponse";

function getUrl(path: string) {
  let url = environment.backend_url;
  if (environment.backend_port) {
    url += `:${environment.backend_port}`;
  }
  url += path;
  return url;
}

function handleError(error: AxiosError<ErrorResponse>) {
  if (!error.response) {
    console.error(`Unknown error occurred!`);
    throw new Error('UNKNOWN_ERROR');
  }
  if (error.response.status === 401) {
    throw new Error('UNAUTHORIZED');
  }
  if (error.response.status === 403) {
    throw new Error('FORBIDDEN');
  }
  if (error.response.status === 404) {
    throw new Error('NOT_FOUND')
  }
  if (error.response.status === 422) {
    throw new Error(error.response.data.cause);
  }

  console.error(`Unknown error occurred! Status: ${error.response.status}`);
  throw new Error('UNKNOWN_ERROR');
}

function resolveResponse<T>(response: Promise<AxiosResponse<T>>): Promise<T> {
  return response.catch(handleError).then(_result => (_result as AxiosResponse).data);
}

export function get<T>(path: string, params?: {[key: string]: string | number}): Promise<T> {
  return resolveResponse(axios.get<T>(getUrl(path), {
    params: params
  }));
}

export function post<T>(path: string, data?: any, params?: {[key: string]: string | number}): Promise<T> {
  return resolveResponse(axios.post<T>(getUrl(path), data, {
    params: params
  }));
}

export function put<T>(path: string, data?: any, params?: {[key: string]: string | number}): Promise<T> {
  return resolveResponse(axios.put<T>(getUrl(path), data, {
    params: params
  }));
}

export function del<T>(path: string, params?: {[key: string]: string | number}): Promise<void> {
  return resolveResponse(axios.delete<void>(getUrl(path), {
    params: params
  }));
}
