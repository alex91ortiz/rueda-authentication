export type ConfirmationTokenModel = {
    id: number | string;
    accessToken: string;
    userId: string;
}

export type AddConfirmationTokenParams = Omit<ConfirmationTokenModel, 'id'>
