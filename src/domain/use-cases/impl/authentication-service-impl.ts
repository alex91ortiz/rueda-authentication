import { Inject, Service } from "@tsclean/core";
import { IAuthenticationService } from "@/domain/use-cases/authentication-service";
import { ENCRYPT, IEncrypt } from "@/domain/use-cases/helpers/encrypt";
import { CHECK_EMAIL_REPOSITORY, ICheckEmailRepository } from "@/domain/models/gateways/check-email-repository";
import { HASH_COMPARE, IHashCompare } from "../helpers/hash-compare";
import { IUpdateAccessTokenRepository, UPDATE_ACCESS_TOKEN_REPOSITORY } from "@/domain/models/gateways/update-access-token-repository";

@Service()
export class AuthenticationServiceImpl implements IAuthenticationService {
    constructor(
        @Inject(ENCRYPT) private readonly encrypt: IEncrypt,
        @Inject(CHECK_EMAIL_REPOSITORY) private readonly checkEmailRepository: ICheckEmailRepository,
        @Inject(HASH_COMPARE) private readonly hashCompare: IHashCompare,
        @Inject(UPDATE_ACCESS_TOKEN_REPOSITORY) private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
    ) { }
    async auth(data: IAuthenticationService.Params): Promise<IAuthenticationService.Result> {
        const account = await this.checkEmailRepository.checkMail(data.email);
        if (account.enable && !account.locked) {
            const isValid = await this.hashCompare.compare(data.password, account.password);
            if (isValid) {
                const accessToken = await this.encrypt.encrypt(account.id);
                await this.updateAccessTokenRepository.updateToken(account.id, accessToken);
                return {
                    accessToken,
                    name: account.firstName
                }
            }
        }
        return null;
    };

}