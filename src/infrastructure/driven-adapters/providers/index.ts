import { BcryptAdapter } from "@/infrastructure/driven-adapters/adapters/bcrypt-adapter";
import { UserMongooseRepositoryAdapter } from "@/infrastructure/driven-adapters/adapters/orm/mongoose/user-mongoose-repository-adapter";
import { ADD_USER_REPOSITORY } from "@/domain/models/gateways/add-user-repository";
import { CHECK_EMAIL_REPOSITORY } from "@/domain/models/gateways/check-email-repository";
import { AddUserServiceImpl } from "@/domain/use-cases/impl/add-user-service-impl";
import { ADD_USER_SERVICE } from "@/domain/use-cases/add-user-service";
import { ENCRYPT } from "@/domain/use-cases/helpers/encrypt";
import { GET_USERS_REPOSITORY } from "@/domain/models/gateways/get-users-repository";
import { UPDATE_ACCESS_TOKEN_REPOSITORY } from "@/domain/models/gateways/update-access-token-repository";
import { HASH_COMPARE } from "@/domain/use-cases/helpers/hash-compare";
import { GetUsersServiceImpl } from "@/domain/use-cases/impl/get-users-service-impl";
import { GET_USERS_SERVICE } from "@/domain/use-cases/get-users-service";
import { AuthenticationServiceImpl } from "@/domain/use-cases/impl/authentication-service-impl";
import { AUTHENTICATION_SERVICE } from "@/domain/use-cases/authentication-service";
import { COMPLEMENTAL_DATA_SERVICE } from "@/domain/use-cases/complemental-data-service";
import { SET_USER_REPOSITORY } from "@/domain/models/gateways/set-user-repository";
import { ComplementalDataServiceImpl } from "@/domain/use-cases/impl/complemental-data-service-impl";
import { ConfirmationTokenMongooseRepositoryAdapter } from "../adapters/orm/mongoose/confirmation-token-mongoose-repository-adapter";
import { ADD_CONFIRMATION_TOKEN_REPOSITORY } from "@/domain/models/gateways/confirmation-token-repository";
import { ConfirmationTokenServiceImpl } from "@/domain/use-cases/impl/confirmation-token-service-impl";
import { CONFIRMATION_TOKEN_SERVICE } from "@/domain/use-cases/confirmation-token-service";
import { EnableAccountUserServiceImpl } from "@/domain/use-cases/impl/enable-account-user-service-impl";
import { ENABLE_ACCOUNT_USER_SERVICE } from "@/domain/use-cases/enable-account-user-service";
import { SendMail } from "../adapters/send-mail";
import { SEND_MAIL } from "@/domain/use-cases/helpers/send-mail";
export const adapters = [
    {
        classAdapter: BcryptAdapter,
        key: ENCRYPT
    },
    {
        classAdapter: UserMongooseRepositoryAdapter,
        key: ADD_USER_REPOSITORY
    },
    {
        classAdapter: UserMongooseRepositoryAdapter,
        key: GET_USERS_REPOSITORY
    },
    {
        classAdapter: UserMongooseRepositoryAdapter,
        key: CHECK_EMAIL_REPOSITORY
    },
    {
        classAdapter: UserMongooseRepositoryAdapter,
        key: UPDATE_ACCESS_TOKEN_REPOSITORY
    },
    {
        classAdapter: BcryptAdapter,
        key: HASH_COMPARE
    },
    {
        classAdapter: SendMail,
        key: SEND_MAIL
    },
    {
        classAdapter: UserMongooseRepositoryAdapter,
        key: SET_USER_REPOSITORY
    },
    {
        classAdapter: ConfirmationTokenMongooseRepositoryAdapter,
        key: ADD_CONFIRMATION_TOKEN_REPOSITORY
    }
];

export const services = [
    {
        classAdapter: AddUserServiceImpl,
        key: ADD_USER_SERVICE
    },
    {
        classAdapter: GetUsersServiceImpl,
        key: GET_USERS_SERVICE
    },
    {
        classAdapter: AuthenticationServiceImpl,
        key: AUTHENTICATION_SERVICE
    },
    {
        classAdapter: ComplementalDataServiceImpl,
        key: COMPLEMENTAL_DATA_SERVICE
    },
    {
        classAdapter: EnableAccountUserServiceImpl,
        key : ENABLE_ACCOUNT_USER_SERVICE
    },
    {
        classAdapter: ConfirmationTokenServiceImpl,
        key: CONFIRMATION_TOKEN_SERVICE
    }
];
