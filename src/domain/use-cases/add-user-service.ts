import { AddUserParams } from "@/domain/models/user";

export const ADD_USER_SERVICE = "ADD_USER_SERVICE";

export interface IAddUserService {
    addUser: (data: AddUserParams) => Promise<IAddUserService.Result | IAddUserService.Exist>;
    checkMailUser: (email: string) => Promise<boolean>;
}

export namespace IAddUserService {
    export type Exist = boolean;
    export type Result = {
        id?: string | number;
    };
}