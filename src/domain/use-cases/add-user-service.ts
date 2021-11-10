import { AddUserParams } from "@/domain/models/user";

export const ADD_USER_SERVICE = "ADD_USER_SERVICE";

export interface IAddUserService {
    addUser: (data: AddUserParams) => Promise<IAddUserService.Result | IAddUserService.Exist>;
    checkMailUser: (email: string) => Promise<IAddUserService.Exist>;
    changePassword: (data: IAddUserService.Params) => Promise<IAddUserService.Exist>;
}

export namespace IAddUserService {
    export type Exist = boolean;
    export type Result = {
        id?: string | number;
    };
    export type Params = {
        id: string;
        password: string;
    }
}