import {ObjectInitializer} from "@/utils/object-initializer";

export class UserModel extends ObjectInitializer<UserModel> {
    id: string;
    email: string;
}
