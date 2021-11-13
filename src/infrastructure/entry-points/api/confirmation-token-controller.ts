import {Body, Mapping, Param, Get, Inject, Post} from "@tsclean/core";
import {ConfirmationTokenServiceImpl} from "@/domain/use-cases/impl/confirmation-token-service-impl";
import { CONFIRMATION_TOKEN_SERVICE, IConfirmationTokenService } from "@/domain/use-cases/confirmation-token-service";

@Mapping('api/v1/confirmation-token')
export class ConfirmationTokenController {

    constructor(
        @Inject(CONFIRMATION_TOKEN_SERVICE) private readonly confirmationTokenServiceImpl: ConfirmationTokenServiceImpl
    ) {}
    
    @Get("/send-token/:email")
    async sendConfirmationToken(@Param("email") email: string): Promise<any> {
        const token = await this.confirmationTokenServiceImpl.sendMailConfirmationToken(email);
        if(!token) return {response: { statusCode: 423, body: { messages: "Correo no valido" } } };
        return {response: { statusCode: 200, body: token }};
    }

    @Post()
    async addConfirmationTokenController(@Param() data: IConfirmationTokenService.Param){
        const validationMail = await this.confirmationTokenServiceImpl.validationMail(data.email);
        if (!validationMail.successful) return {response: { statusCode: 500, body: "correo no valido" }};
        return await this.confirmationTokenServiceImpl.addConfirmationToken(data.email, validationMail.accessToken);
    }
}
