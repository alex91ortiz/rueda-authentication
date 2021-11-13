import { Mapping, Body, Post, Inject, Get, Param } from "@tsclean/core";
import { AuthenticationServiceImpl } from "@/domain/use-cases/impl/authentication-service-impl";
import { AUTHENTICATION_SERVICE, IAuthenticationService } from "@/domain/use-cases/authentication-service";
import { CONFIRMATION_TOKEN_SERVICE, IConfirmationTokenService } from "@/domain/use-cases/confirmation-token-service";
import { ConfirmationTokenServiceImpl } from "@/domain/use-cases/impl/confirmation-token-service-impl";
import { ENABLE_ACCOUNT_USER_SERVICE } from "@/domain/use-cases/enable-account-user-service";
import { EnableAccountUserServiceImpl } from "@/domain/use-cases/impl/enable-account-user-service-impl";

@Mapping('api/v1/authentication')
export class AuthenticationController {

    constructor(
        @Inject(AUTHENTICATION_SERVICE) private readonly authenticationService: AuthenticationServiceImpl,
        @Inject(CONFIRMATION_TOKEN_SERVICE) private readonly confirmationTokenServiceImpl: ConfirmationTokenServiceImpl,
        @Inject(ENABLE_ACCOUNT_USER_SERVICE) private readonly enableAccountUserService: EnableAccountUserServiceImpl
    ) {
    }


    @Post()
    async authController(@Body() data: IAuthenticationService.Params): Promise<IAuthenticationService.Result> {
        const result = await this.authenticationService.auth(data);
        if (result) {
            return {
                accessToken: result.accessToken,
                name: result.name
            }
        }
        return null;
    }

    @Post("reset-password")
    async resetPassword(@Body() data: IConfirmationTokenService.Param) {
        const validationMail = await this.confirmationTokenServiceImpl.validationMail(data.email);
        if (!validationMail.successful) return {response: { statusCode: 500, body: "correo no valido" }};
        const confirmation = await this.confirmationTokenServiceImpl.addConfirmationToken(data.email, validationMail.accessToken);
    }


}
