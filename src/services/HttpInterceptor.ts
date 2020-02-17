import { AxiosResponse } from 'axios';
import {AxiosRequestConfig} from 'axios';
import {store} from '@/store/Store';
import {authService} from './AuthService';
import {TokenResponse} from 'tyr-api';
import {StatusCodes} from '@/services/StatusCodes';
import {Http} from '@/services/HttpService';

export const enableInterceptor = () => {
  Http.axios().interceptors.request.use(async (config: AxiosRequestConfig) => {
    if (config.url && config.url.indexOf('/oauth') > -1) {
      return config;
    }

    let tokens = store.getters['auth/tokens'] as TokenResponse;

    if (tokens && Object.keys(tokens).length === 4) {
      const refreshBefore = new Date();
      refreshBefore.setMinutes(refreshBefore.getMinutes() - 1);

      if (new Date(tokens.accessTokenExpiration) < refreshBefore) {
        await store.dispatch('auth/refreshToken').catch(() => authService.logout());
        tokens = store.getters['auth/tokens'] as TokenResponse;
      }

      config.headers['Authorization'] = tokens.accessToken;
    }

    return config;
  });

  Http.axios().interceptors.response.use(async (res: AxiosResponse) => {
    if (res.status === StatusCodes.UNAUTHORIZED) {
      await store.dispatch('auth/refreshToken');
    }

    return res;
  });
};



