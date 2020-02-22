import {store} from '@/store';
import {router} from '@/router';
import {environment} from '@/environment/environment';
import {
  LoginRequest,
  LoginResponse, LogoutRequest,
  RegistrationRequest,
  RegistrationResponse,
  TokenResponse
} from 'tyr-api/types/axios';
import {Http} from '@/services/http.service';


export class AuthService  {
  private isRefreshing = false;
  private refreshPromise = Promise.resolve<TokenResponse>(<any>{});
  private static _instance: AuthService;

  constructor() {}

  static get instance(): AuthService {
    return this._instance ? this._instance : this._instance = new AuthService();
  }

  login(request: { email: string, password: string }): Promise<LoginResponse> {
    return Http.post<LoginResponse>('/oauth/login', <LoginRequest>{
      email: request.email,
      password: request.password,
      clientId: environment.client_id,
      redirectUri: environment.redirect_uri
    });
  }

  register(email: string, password: string): Promise<RegistrationResponse> {
    return Http.post<RegistrationResponse>('/oauth/register', <RegistrationRequest>{
      email: email,
      password: password
    });
  }

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
  }

  refreshTokens(token: string): Promise<TokenResponse> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      return Http.post<TokenResponse>('/oauth/token', undefined, {
        'grant_type': 'refresh_token',
        'refresh_token': store.getters['auth/tokens'].refreshToken,
        'client_id': environment.client_id
      }).finally(() => this.isRefreshing = false);
    } else {
      return this.refreshPromise;
    }
  }

  logout(): Promise<void> {
    return Http.post('/oauth/logout', this.logOutLocallyAndCreateLogoutRequest());
  }

  logoutEverywhere(): Promise<void> {
    return Http.post('/oauth/logout/all', this.logOutLocallyAndCreateLogoutRequest());
  }

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

  private logOutLocallyAndCreateLogoutRequest(): LogoutRequest {
    const request = <LogoutRequest>{};
    request.accessToken = store.getters['auth/tokens'].accessToken;
    store.commit('auth/clear');
    router.push('/login');
    return request;
  }
}

export const authService: AuthService = AuthService.instance;
