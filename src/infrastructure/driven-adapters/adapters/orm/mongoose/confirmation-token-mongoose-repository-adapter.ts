import { AddConfirmationTokenParams, ConfirmationTokenModel } from "@/domain/models/confirmation-token";
import { IConfirmationTokenRepository } from "@/domain/models/gateways/confirmation-token-repository";
import { ConfirmationTokenModelSchema } from "@/infrastructure/driven-adapters/adapters/orm/mongoose/models/confirmation-token";


export class ConfirmationTokenMongooseRepositoryAdapter implements IConfirmationTokenRepository {
    
    async addTokenRepository(data: AddConfirmationTokenParams) : Promise<ConfirmationTokenModel>{
        return await ConfirmationTokenModelSchema.create(data);
    }
    async getTokenRepository(userId: string) : Promise<ConfirmationTokenModel>{
        return await ConfirmationTokenModelSchema.findOne({userId: userId}).exec();
    }
    async checkCodeRepository(userId: string, accessToken: string): Promise<ConfirmationTokenModel>{
        return await ConfirmationTokenModelSchema.findOne({userId: userId, accessToken: accessToken}).exec();
    }
    async deleteTokenRepository(userId: string): Promise<void>{
        await ConfirmationTokenModelSchema.deleteOne({userId: userId });
    }
}
