import { AddUserController } from "@/infrastructure/entry-points/api/add-user-controller";
import { AuthenticationController } from "@/infrastructure/entry-points/api/authentication-controller";
import { GetUsersController } from "@/infrastructure/entry-points/api/get-users-controller";
import { ComplementalDataController } from "@/infrastructure/entry-points/api/complemental-data-controller";
import { EnableAccountUserController } from "@/infrastructure/entry-points/api/enable-account-user-controller";

export const controllers = [
    AddUserController,
    GetUsersController,
    AuthenticationController,
    ComplementalDataController,
    EnableAccountUserController
];