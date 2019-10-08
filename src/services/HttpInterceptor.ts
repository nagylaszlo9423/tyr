import axios from 'axios';
import {AxiosRequestConfig} from 'axios'
import {store} from '../store/Store';
import {TokenResponse} from './dtos/auth/TokenResponse';
import {authService} from './AuthService';

export const interceptRequests = () => {
  axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
    console.log(config);
    let tokens = store.getters['auth/tokens'] as TokenResponse;
    const refreshBefore = new Date();
    refreshBefore.setMinutes(refreshBefore.getMinutes() - 1);
    if (tokens.accessTokenExpiration < refreshBefore) {
      await store.dispatch('auth/refreshToken').catch(() => authService.logout());
      tokens = store.getters['auth/tokens'] as TokenResponse;
    }
    config.headers['Authorization'] = tokens.accessToken;
    return config;
  });
};



