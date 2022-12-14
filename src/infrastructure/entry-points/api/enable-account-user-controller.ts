import {Mapping, Get, Post, Inject, Body} from "@tsclean/core";
import {EnableAccountUserServiceImpl} from "@/domain/use-cases/impl/enable-account-user-service-impl";
import { ENABLE_ACCOUNT_USER_SERVICE } from "@/domain/use-cases/enable-account-user-service";
import { CONFIRMATION_TOKEN_SERVICE, IConfirmationTokenService } from "@/domain/use-cases/confirmation-token-service";
import { ConfirmationTokenServiceImpl } from "@/domain/use-cases/impl/confirmation-token-service-impl";

@Mapping('api/v1/enable-account-user')
export class EnableAccountUserController {

    constructor(
        @Inject(ENABLE_ACCOUNT_USER_SERVICE) private readonly enableAccountUserService: EnableAccountUserServiceImpl,
        @Inject(CONFIRMATION_TOKEN_SERVICE) private readonly confirmationTokenService: ConfirmationTokenServiceImpl
    ) {
    }

    @Post()
    async confirmCodeAndEnableUser(@Body() data: IConfirmationTokenService.Param): Promise<any> {
        const userValid = await this.confirmationTokenService.checkConfirmationToken(data);
        if (userValid){
            await this.enableAccountUserService.changeStatusAccount(userValid.id.toString(), true,true);
            return {error: 200, successful: true};
        }
        return {error: 404, successful: false};
    }
}
