import {BaseDto} from "../BaseDto";


export class RegistrationRequest extends BaseDto<RegistrationRequest> {
  email: string;
  password: string;
}
