import { Mapping, Get, Post, Body, Inject, Param, Put } from "@tsclean/core";
import { AddUserServiceImpl } from "@/domain/use-cases/impl/add-user-service-impl";
import { AddUserParams } from "@/domain/models/user";
import { ADD_USER_SERVICE, IAddUserService } from "@/domain/use-cases/add-user-service";
import { ValidateFields } from "../helpers/validate-fields";
import { ConfirmationTokenServiceImpl } from "@/domain/use-cases/impl/confirmation-token-service-impl";
import { CONFIRMATION_TOKEN_SERVICE, IConfirmationTokenService } from "@/domain/use-cases/confirmation-token-service";


@Mapping('api/v1/add-user')
export class AddUserController {

    constructor(
        @Inject(ADD_USER_SERVICE) private readonly addUserService: AddUserServiceImpl,
        @Inject(CONFIRMATION_TOKEN_SERVICE) private readonly confirmationTokenServiceImpl: ConfirmationTokenServiceImpl
    ) {
    }

    @Post()
    async addUserController(@Body() data: AddUserParams): Promise<any | IAddUserService.Exist> {
        const { errors, isValid } = ValidateFields.fieldsValidation(data);
        if (!isValid) return {response: { statusCode: 400, body: { messages: errors } } };
        data.enable = false;
        data.locked = true;
        const validationMail = await this.confirmationTokenServiceImpl.validationMail(data.email);
        if (!validationMail.successful) return {response: { statusCode: 500, body: "correo no valido" }};
        const account = await this.addUserService.addUser(data);
        if (account === true) return {response: { statusCode: 404, body: account }};
        const confirmtoken = await this.confirmationTokenServiceImpl.addConfirmationToken(data.email, validationMail.accessToken);
        return  {response: { statusCode: 200, body: account  }};
    }

    @Get("checkmail/:email")
    async checkMailUserController(@Param("email") email: string): Promise<boolean> {
        return await this.addUserService.checkMailUser(email);
    }

    @Post("/change-password")
    async changePasswordController(@Body() data: IAddUserService.Params): Promise<boolean> {
        return await this.addUserService.changePassword(data);
    }

}
