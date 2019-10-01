import {TokenResponse} from "./dtos/auth/TokenResponse";
import {post} from './HttpService';
import {LoginRequest} from "./dtos/auth/LoginRequest";
import {LoginResponse} from "./dtos/auth/LoginResponse";
import environment from "../environment/environment";
import {RegistrationResponse} from "./dtos/auth/RegistrationResponse";
import {RegistrationRequest} from "./dtos/auth/RegistrationRequest";
import {store} from "../store/Store";
import {router} from "../Router";

let isRefreshing = false;

export const authService =  {
  refreshPromise: Promise.resolve<TokenResponse>(new TokenResponse()),
  login(email: string, password: string): Promise<void> {
    return post<LoginResponse>('/oauth/login', new LoginRequest({
      email: email,
      password: password,
      clientId: environment.client_id,
      redirectUri: environment.redirect_uri
    })).then(response => this.exchangeCode(response.code, response.redirectUri, environment.client_id)).then(() => {});
  },
  register(email: string, password: string): Promise<RegistrationResponse> {
    return post<RegistrationResponse>('/oauth/register', new RegistrationRequest({
      email: email,
      password: password
    }));
  },
  exchangeCode(code: string, redirectUri: string, clientId: string): Promise<TokenResponse> {
    return post<TokenResponse>('/oauth/token', undefined, {
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': redirectUri,
      'client_id': clientId
    })
  },
  refreshTokens(token: string): Promise<TokenResponse> {
    if (!isRefreshing) {
      isRefreshing = true;
      return post<TokenResponse>('/oauth/token', undefined, {
        'grant_type': 'refresh_token',
        'refresh_token': token
      }).finally(() => isRefreshing = false);
    } else {
      return this.refreshPromise;
    }
  },
  logout() {
    store.commit('auth/clear');
    router.push('/login');
  },
  async isLoggedIn(): Promise<boolean> {
    console.log('isLoggedIn');
    try {
      const now = new Date();
      const tokens = store.getters['auth/tokens'] as TokenResponse;
      if (!navigator.onLine && tokens.accessToken && tokens.accessToken !== '' && tokens.refreshToken && tokens.refreshToken !== '') {
        return true;
      }
      if (tokens.accessTokenExpiration && tokens.accessTokenExpiration < now) {
        if (tokens.refreshTokenExpiration && tokens.refreshTokenExpiration < now) {
          return false;
        }

        await store.dispatch('auth/refreshToken');
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  }
};
