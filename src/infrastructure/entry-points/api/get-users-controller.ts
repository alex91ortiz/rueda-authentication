import {Mapping, Get, Inject, Param, Post, Body} from "@tsclean/core";
import {GetUsersServiceImpl} from "@/domain/use-cases/impl/get-users-service-impl";
import { GET_USERS_SERVICE } from "@/domain/use-cases/get-users-service";
import { IAuthenticationService } from "@/domain/use-cases/authentication-service";

@Mapping('api/v1/get-users')
export class GetUsersController {

    constructor(
        @Inject(GET_USERS_SERVICE)
        private readonly getUsersService: GetUsersServiceImpl
    ) {
    }

    @Get()
    async getUsersController(): Promise<any> {
        return await this.getUsersService.getUsers();
    }

    @Post("/tokenaccess")
    async getUsersByTokenAccessController(@Body() token: IAuthenticationService.Result): Promise<any> {
        return await this.getUsersService.getUserByAccessToken(token.accessToken);
    }
}
