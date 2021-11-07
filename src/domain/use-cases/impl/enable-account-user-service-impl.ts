import {Adapter, Service} from "@tsclean/core";
import {IEnableAccountUserService} from "@/domain/use-cases/enable-account-user-service";
import { ISetUserRepository, SET_USER_REPOSITORY } from "@/domain/models/gateways/set-user-repository";
import { GET_USERS_REPOSITORY, IGetUsersRepository } from "@/domain/models/gateways/get-users-repository";

@Service()
export class EnableAccountUserServiceImpl implements IEnableAccountUserService {
    constructor(
        @Adapter(GET_USERS_REPOSITORY) private readonly getUserRepository : IGetUsersRepository,
        @Adapter(SET_USER_REPOSITORY) private readonly setUserRepository : ISetUserRepository
    ) {
    }
    async changeStatusAccount(userId: string, enable: boolean, locked: boolean): Promise<void> {
        const account = await this.getUserRepository.getUserByIdRepository(userId);
        account.enable = enable;
        account.locked = locked;
        return this.setUserRepository.updateUser(userId, account);
    }

}