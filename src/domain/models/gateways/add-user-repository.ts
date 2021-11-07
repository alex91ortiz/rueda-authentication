import { AddUserParams, UserModel } from "@/domain/models/user";

export const ADD_USER_REPOSITORY = "ADD_USER_REPOSITORY";

export interface IAddUserRepository {
    addUser: (data: AddUserParams) => Promise<UserModel>;
}
