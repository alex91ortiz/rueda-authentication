import {Mapping, Get, Inject, Param} from "@tsclean/core";
import {GetUsersServiceImpl} from "@/domain/use-cases/impl/get-users-service-impl";
import { GET_USERS_SERVICE } from "@/domain/use-cases/get-users-service";

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

    @Get("/tokenaccess/:token")
    async getUsersByTokenAccessController(@Param("token") token: string): Promise<any> {
        return await this.getUsersService.getUserByAccessToken(token);
    }
}
