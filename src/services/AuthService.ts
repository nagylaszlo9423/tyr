import {TokenResponse} from "./dtos/auth/TokenResponse";
import {post} from './HttpService';
import {LoginRequest} from "./dtos/auth/LoginRequest";
import {LoginResponse} from "./dtos/auth/LoginResponse";
import environment from "../environment/environment";
import {RegistrationResponse} from "./dtos/auth/RegistrationResponse";
import {RegistrationRequest} from "./dtos/auth/RegistrationRequest";

export default {
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
  refreshTokens(tokens: TokenResponse): Promise<TokenResponse> {
    return post<TokenResponse>('/oauth/token', undefined, {
      'grant_type': 'refresh_token',
      'refresh_token': tokens.refreshToken
    });
  },
}
