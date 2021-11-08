import { Inject, InjectableDecorator} from "@tsclean/core";
import {IAddUserService} from "@/domain/use-cases/add-user-service";
import { AddUserParams } from "@/domain/models/user";
import { ADD_USER_REPOSITORY, IAddUserRepository } from "@/domain/models/gateways/add-user-repository";
import { CHECK_EMAIL_REPOSITORY, ICheckEmailRepository } from "@/domain/models/gateways/check-email-repository";
import {ENCRYPT, IEncrypt} from "@/domain/use-cases/helpers/encrypt";

@InjectableDecorator()
export class AddUserServiceImpl implements IAddUserService {
    constructor(
        @Inject(ENCRYPT) private readonly encrypt : IEncrypt,
        @Inject(CHECK_EMAIL_REPOSITORY) private readonly checkEmailRepository : ICheckEmailRepository,
        @Inject(ADD_USER_REPOSITORY) private readonly addUserRepository : IAddUserRepository
    ) {}
    async addUser(data: AddUserParams) : Promise<IAddUserService.Result | IAddUserService.Exist>{
        const userExist = await this.checkEmailRepository.checkMail(data.email);
        if (userExist) return true;
        const encryptPassword = await this.encrypt.encrypt(data.password);
        const user = await this.addUserRepository.addUser({...data, password: encryptPassword, accessToken: ""});
        if (user) return user;
    };
}