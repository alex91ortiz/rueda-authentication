import { Inject, Service } from "@tsclean/core";
import { ENCRYPT, IEncrypt } from "@/domain/use-cases/helpers/encrypt";
import { IConfirmationTokenService } from "@/domain/use-cases/confirmation-token-service";
import { ConfirmationTokenModel } from "@/domain/models/confirmation-token";
import { ADD_CONFIRMATION_TOKEN_REPOSITORY, IConfirmationTokenRepository } from "@/domain/models/gateways/confirmation-token-repository";
import { CHECK_EMAIL_REPOSITORY, ICheckEmailRepository } from "@/domain/models/gateways/check-email-repository";
import { SEND_MAIL } from "../helpers/send-mail";
import { SendMail } from "@/infrastructure/driven-adapters/adapters/send-mail";
import { TemplateValidationCode } from "../helpers/template-email";

@Service()
export class ConfirmationTokenServiceImpl implements IConfirmationTokenService {
    constructor(
        @Inject(SEND_MAIL) private readonly sendMail : SendMail, 
        @Inject(CHECK_EMAIL_REPOSITORY) private readonly checkEmailRepository: ICheckEmailRepository,
        @Inject(ADD_CONFIRMATION_TOKEN_REPOSITORY) private readonly iConfirmationTokenRepository: IConfirmationTokenRepository
    ) {
    }


    async getConfirmationToken(userId: string): Promise<ConfirmationTokenModel> {
        //throw new Error("Method not implemented.");
        return this.iConfirmationTokenRepository.getTokenRepository(userId);
    }
    async addConfirmationToken(email: string): Promise<IConfirmationTokenService.Result> {
        const account = await this.checkEmailRepository.checkMail(email);
        if(!account) return null;
        const accessToken = Math.floor(1000 + Math.random() * 9000);
        let templateMail = {
            from: "Rueda",
            to: email,
            subject: "Código de verificación de Rueda",
            text: "Texto desde confirmacion de nuevo usuario",
            html: TemplateValidationCode(accessToken)
        };
        const resultmail = await this.sendMail.send(templateMail);
        if(resultmail.successful){
            return await this.iConfirmationTokenRepository.addTokenRepository({ userId: account.id.toString(), accessToken: accessToken.toString() });
        }
        return null;
    }
    async checkConfirmationToken(data: IConfirmationTokenService.Param): Promise<ICheckEmailRepository.Result> {
        const userExist = await this.checkEmailRepository.checkMail(data.email);
        if (!userExist) return null;
        const isValid = await this.iConfirmationTokenRepository.checkCodeRepository(userExist.id.toString(), data.accessToken);
        if (isValid){
            this.iConfirmationTokenRepository.deleteTokenRepository(isValid.userId.toString());
            return userExist;
        }
        return null;
    }
}