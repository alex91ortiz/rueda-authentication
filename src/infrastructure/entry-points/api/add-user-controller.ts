import { Mapping, Get, Post, Body, Adapter, Param } from "@tsclean/core";
import { AddUserServiceImpl } from "@/domain/use-cases/impl/add-user-service-impl";
import { AddUserParams } from "@/domain/models/user";
import { ADD_USER_SERVICE, IAddUserService } from "@/domain/use-cases/add-user-service";
import { ValidateFields } from "../helpers/validate-fields";
import { ConfirmationTokenServiceImpl } from "@/domain/use-cases/impl/confirmation-token-service-impl";
import { CONFIRMATION_TOKEN_SERVICE, IConfirmationTokenService } from "@/domain/use-cases/confirmation-token-service";


@Mapping('api/v1/add-user')
export class AddUserController {

    constructor(
        @Adapter(ADD_USER_SERVICE) private readonly addUserService: AddUserServiceImpl,
        @Adapter(CONFIRMATION_TOKEN_SERVICE) private readonly confirmationTokenServiceImpl: ConfirmationTokenServiceImpl
    ) {
    }

    @Post()
    async addUserController(@Body() data: AddUserParams): Promise<any | IAddUserService.Exist> {
        const { errors, isValid } = ValidateFields.fieldsValidation(data);
        if (!isValid) return {response: { statusCode: 422, body: { messages: errors } } };
        data.enable = false;
        const account = await this.addUserService.addUser(data);
        if (account === true) return {response: { statusCode: 400, body: { "messages": "Email is already use" } }};
        this.confirmationTokenServiceImpl.addConfirmationToken(data.email);
        return account;
    }

    @Post("/confirm")
    async confirmAccount(@Body() data: IConfirmationTokenService.Param){
        
    }

}
