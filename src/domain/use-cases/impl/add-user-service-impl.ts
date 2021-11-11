import { Inject, Service} from "@tsclean/core";
import {IAddUserService} from "@/domain/use-cases/add-user-service";
import { AddUserParams } from "@/domain/models/user";
import { ADD_USER_REPOSITORY, IAddUserRepository } from "@/domain/models/gateways/add-user-repository";
import { CHECK_EMAIL_REPOSITORY, ICheckEmailRepository } from "@/domain/models/gateways/check-email-repository";
import {ENCRYPT, IEncrypt} from "@/domain/use-cases/helpers/encrypt";
import { ISetUserRepository, SET_USER_REPOSITORY } from "@/domain/models/gateways/set-user-repository";
import { GET_USERS_REPOSITORY, IGetUsersRepository } from "@/domain/models/gateways/get-users-repository";

@Service()
export class AddUserServiceImpl implements IAddUserService {
    constructor(
        @Inject(ENCRYPT) private readonly encrypt : IEncrypt,
        @Inject(CHECK_EMAIL_REPOSITORY) private readonly checkEmailRepository : ICheckEmailRepository,
        @Inject(ADD_USER_REPOSITORY) private readonly addUserRepository : IAddUserRepository,
        @Inject(SET_USER_REPOSITORY) private readonly setUserRepository : ISetUserRepository,
        @Inject(GET_USERS_REPOSITORY) private readonly getUserRepository: IGetUsersRepository
    ) {}

    async addUser(data: AddUserParams) : Promise<IAddUserService.Result | IAddUserService.Exist>{
        const encryptPassword = await this.encrypt.encrypt(data.password);
        const user = await this.addUserRepository.addUser({...data, password: encryptPassword, accessToken: ""});
        if (user) return user;
    };

    async checkMailUser(email: string) : Promise<boolean>{
        const userExist = await this.checkEmailRepository.checkMail(email);
        if (userExist) return true;
        return false;
    }

    async changePassword(data: IAddUserService.Params) : Promise<boolean>{
        const userFound = await this.getUserRepository.getUserByIdRepository(data.id);
        console.log(data,userFound);
        if (!userFound) return false;
        const encryptPassword = await this.encrypt.encrypt(data.password);
        userFound.password = encryptPassword;
        await this.setUserRepository.updateUser(data.id, userFound);
        return true;
    };
}