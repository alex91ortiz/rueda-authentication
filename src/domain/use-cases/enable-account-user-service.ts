import { AddUserParams } from "../models/user";

export const ENABLE_ACCOUNT_USER_SERVICE = "ENABLE_ACCOUNT_USER_SERVICE";
export interface IEnableAccountUserService {
    changeStatusAccount(userId: string, enable: boolean, locked: boolean): Promise<void>;
}