import {BaseDto} from "../BaseDto";


export class TokenResponse {
  accessToken: string = '';
  accessTokenExpiration: Date = new Date();
  refreshToken: string = '';
  refreshTokenExpiration: Date = new Date();
}
