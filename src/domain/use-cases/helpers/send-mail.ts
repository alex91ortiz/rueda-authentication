export const SEND_MAIL = "SEND_MAIL";

export interface ISendMail {
    send: (data: IsendMail.Params) => Promise<IsendMail.Result>;
}

export namespace IsendMail {
    
    export type Result = {
        error: string;
        successful: boolean;
        accessToken: number;
    }

    export type Params = {
        from: string;
        to: string;
        subject: string;
        text: string;
        html: string
    }
}