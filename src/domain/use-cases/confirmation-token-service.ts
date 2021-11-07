import { type } from "os";
import { ConfirmationTokenModel } from "../models/confirmation-token";
import { ICheckEmailRepository } from "../models/gateways/check-email-repository";
export const CONFIRMATION_TOKEN_SERVICE =  "CONFIRMATION_TOKEN_SERVICE";
export interface IConfirmationTokenService {
    addConfirmationToken: (email: string) => Promise<IConfirmationTokenService.Result>;
    getConfirmationToken(userId: string): Promise<ConfirmationTokenModel>;
    checkConfirmationToken(data: IConfirmationTokenService.Param) : Promise<ICheckEmailRepository.Result>;
}

export namespace IConfirmationTokenService {
    export type Param = {
        email: string;
        accessToken: string;
    }
    export type Result = {
        accessToken: string;
    }
}
