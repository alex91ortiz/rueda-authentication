import { AddConfirmationTokenParams, ConfirmationTokenModel } from "../confirmation-token";

export const ADD_CONFIRMATION_TOKEN_REPOSITORY = "ADD_CONFIRMATION_TOKEN_REPOSITORY";

export interface IConfirmationTokenRepository {
    addTokenRepository: (data: AddConfirmationTokenParams) => Promise<ConfirmationTokenModel>;
    getTokenRepository: (userId: string)=> Promise<ConfirmationTokenModel>;
    checkCodeRepository: (userId: string, accessToken: string) => Promise<ConfirmationTokenModel>;
    deleteTokenRepository: (userId: string) => Promise<void>;
}