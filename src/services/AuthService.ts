import environment from '../environment/environment';
import {store} from '../store/Store';
import {router} from '../Router';
import {LoginRequest, LoginResponse, RegistrationRequest, RegistrationResponse, TokenResponse} from 'tyr-api';
import {Http} from '@/services/HttpService';

let isRefreshing = false;

export const authService = {
  refreshPromise: Promise.resolve<TokenResponse>(new TokenResponse()),
  login(request: {email: string, password: string}): Promise<LoginResponse> {
    return Http.post<LoginResponse>('/oauth/login', <LoginRequest>{
      email: request.email,
      password: request.password,
      clientId: environment.client_id,
      redirectUri: environment.redirect_uri
    });
  },
  register(email: string, password: string): Promise<RegistrationResponse> {
    return Http.post<RegistrationResponse>('/oauth/register', <RegistrationRequest>{
      email: email,
      password: password
    });
  },
  exchangeCode(code: string, redirectUri: string, clientId: string): Promise<TokenResponse> {
    return Http.post<TokenResponse>('/oauth/token', undefined, {
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': redirectUri,
      'client_id': clientId
    }).then((response: TokenResponse) => {
      store.commit('auth/setTokens', response);
      return response;
    });
  },
  refreshTokens(token: string): Promise<TokenResponse> {
    if (!isRefreshing) {
      isRefreshing = true;
      return Http.post<TokenResponse>('/oauth/token', undefined, {
        'grant_type': 'refresh_token',
        'refresh_token': token
      }).finally(() => isRefreshing = false);
    } else {
      return this.refreshPromise;
    }
  },
  logout(shouldNavigate = true): Promise<void> {
    const localLogout = () => {
      store.commit('auth/clear');
      if (shouldNavigate) {
        router.push('/login');
      }
    };
    return Http.post('/oauth/logout').then(localLogout).catch(localLogout);
  },
  async isLoggedIn(): Promise<boolean> {
    try {
      const now = new Date();
      const tokens = store.getters['auth/tokens'];
      if (!navigator.onLine && tokens.accessToken && tokens.accessToken !== '' && tokens.refreshToken && tokens.refreshToken !== '') {
        return true;
      }
      if (!tokens || Object.keys(tokens).length === 0) {
        return false;
      }
      if (tokens.refreshTokenExpiration && new Date(tokens.refreshTokenExpiration) < now) {
        return false;
      }
      if (tokens.accessTokenExpiration && new Date(tokens.accessTokenExpiration) < now) {
        await store.dispatch('auth/refreshToken');
      }

      return true;
    } catch (e) {
      console.error(e);
    }
    return false;
  }
};
