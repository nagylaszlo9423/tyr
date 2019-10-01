import {BaseDto} from "../BaseDto";


export class LoginRequest extends BaseDto<LoginRequest> {
  email: string;
  password: string;
  clientId: string;
  redirectUri: string;
}
