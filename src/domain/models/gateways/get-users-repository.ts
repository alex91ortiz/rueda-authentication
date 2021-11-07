import {UserModel} from "@/domain/models/user";

export const GET_USERS_REPOSITORY = "GET_USERS_REPOSITORY";

export interface IGetUsersRepository {
    getUsersRepository: () => Promise<UserModel[]>
    getUserByIdRepository: (userId: string) => Promise<UserModel>
    getUserByAccessTokenRepository: (token: string) => Promise<UserModel>
}