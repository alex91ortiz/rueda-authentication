import {Body, Mapping, Param, Get, Inject} from "@tsclean/core";
import {ConfirmationTokenServiceImpl} from "@/domain/use-cases/impl/confirmation-token-service-impl";
import { CONFIRMATION_TOKEN_SERVICE } from "@/domain/use-cases/confirmation-token-service";

@Mapping('api/v1/confirmation-token')
export class ConfirmationTokenController {

    constructor(
        @Inject(CONFIRMATION_TOKEN_SERVICE) private readonly confirmationTokenServiceImpl: ConfirmationTokenServiceImpl
    ) {}
    
    @Get("/send-token/:email")
    async sendConfirmationToken(@Param("email") email: string): Promise<any> {
        const token = await this.confirmationTokenServiceImpl.addConfirmationToken(email);
        if(!token) return {response: { statusCode: 423, body: { messages: "Correo no valido" } } };
        return {response: { statusCode: 200, body: token }};
    }
}
