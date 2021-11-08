import { Inject, InjectableDecorator} from "@tsclean/core";
import {IGetUsersService} from "@/domain/use-cases/get-users-service";
import {UserModel} from "@/domain/models/user";
import {GET_USERS_REPOSITORY, IGetUsersRepository} from "@/domain/models/gateways/get-users-repository";

@InjectableDecorator()
export class GetUsersServiceImpl implements IGetUsersService {
    constructor(
        @Inject(GET_USERS_REPOSITORY)
        private readonly getUsersRepository: IGetUsersRepository
    ) {
    }
    async getUserById(userId: string): Promise<UserModel>{
        return await this.getUsersRepository.getUserByIdRepository(userId);
    }

    async getUserByAccessToken(accessToken: string): Promise<UserModel>{
        return await this.getUsersRepository.getUserByAccessTokenRepository(accessToken);
    }

    async getUsers(): Promise<UserModel[]> {
        return await this.getUsersRepository.getUsersRepository();
    }
}