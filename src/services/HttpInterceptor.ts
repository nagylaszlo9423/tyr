import axios from 'axios';
import {AxiosRequestConfig} from 'axios';
import {store} from '../store/Store';
import {authService} from './AuthService';
import {TokenResponse} from 'tyr-api';

export const interceptRequests = () => {
  axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
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
};



