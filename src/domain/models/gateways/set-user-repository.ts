import { AddUserParams, UserModel } from "../user";

export const  SET_USER_REPOSITORY = "SET_USER_REPOSITORY";

export interface ISetUserRepository {
    updateUser:(id: string | number, data: AddUserParams) => Promise<void>;
    addComplementalDataUser:(id: string | number, data: AddUserParams) => Promise<void>;
}