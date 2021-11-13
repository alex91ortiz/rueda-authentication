import { Inject, Service } from "@tsclean/core";
import { IConfirmationTokenService } from "@/domain/use-cases/confirmation-token-service";
import { ConfirmationTokenModel } from "@/domain/models/confirmation-token";
import { ADD_CONFIRMATION_TOKEN_REPOSITORY, IConfirmationTokenRepository } from "@/domain/models/gateways/confirmation-token-repository";
import { CHECK_EMAIL_REPOSITORY, ICheckEmailRepository } from "@/domain/models/gateways/check-email-repository";
import { IsendMail, SEND_MAIL } from "../helpers/send-mail";
import { SendMail } from "@/infrastructure/driven-adapters/adapters/send-mail";
import { TemplateValidationCode } from "../helpers/template-email";

@Service()
export class ConfirmationTokenServiceImpl implements IConfirmationTokenService {
    constructor(
        @Inject(SEND_MAIL) private readonly sendMail: SendMail,
        @Inject(CHECK_EMAIL_REPOSITORY) private readonly checkEmailRepository: ICheckEmailRepository,
        @Inject(ADD_CONFIRMATION_TOKEN_REPOSITORY) private readonly iConfirmationTokenRepository: IConfirmationTokenRepository
    ) {
    }
    async sendMailConfirmationToken(email: string): Promise<IConfirmationTokenService.Result> {
        const account = await this.checkEmailRepository.checkMail(email);
        if (account) {
            this.iConfirmationTokenRepository.deleteTokenRepository(account.id.toString());
        } else {
            return null;
        }

        const resultmail = await this.validationMail(email);
        if (resultmail.successful) {
            return this.iConfirmationTokenRepository.addTokenRepository({ userId: account.id.toString(), accessToken: resultmail.accessToken.toString() });
        } else {
            return null;
        }
    }

    async addConfirmationToken(email: string, accessToken: number): Promise<IConfirmationTokenService.Result> {
        const account = await this.checkEmailRepository.checkMail(email);
        if (!account) return null;
        return this.iConfirmationTokenRepository.addTokenRepository({ userId: account.id.toString(), accessToken: accessToken.toString() });
        
    }


    async getConfirmationToken(userId: string): Promise<ConfirmationTokenModel> {
        //throw new Error("Method not implemented.");
        return this.iConfirmationTokenRepository.getTokenRepository(userId);
    }

    async checkConfirmationToken(data: IConfirmationTokenService.Param): Promise<ICheckEmailRepository.Result> {
        const userExist = await this.checkEmailRepository.checkMail(data.email);
        if (!userExist) return null;
        const isValid = await this.iConfirmationTokenRepository.checkCodeRepository(userExist.id.toString(), data.accessToken);
        if (isValid) {
            this.iConfirmationTokenRepository.deleteTokenRepository(isValid.userId.toString());
            return userExist;
        }
        return null;
    }

    async validationMail(email: string): Promise<IsendMail.Result> {
        const accessToken = Math.floor(1000 + Math.random() * 9000);
        let templateMail = {
            from: "Rueda",
            to: email,
            subject: "Código de verificación de Rueda",
            text: "Texto desde confirmacion de nuevo usuario",
            html: TemplateValidationCode(accessToken)
        };
        const resultMail = await this.sendMail.send(templateMail);
        const addToken = { ...resultMail, accessToken };
        return addToken;
    }
}