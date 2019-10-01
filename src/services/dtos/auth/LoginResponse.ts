import {BaseDto} from "../BaseDto";


export class LoginResponse extends BaseDto<LoginResponse> {
  code: string;
  redirectUri: string;
}
