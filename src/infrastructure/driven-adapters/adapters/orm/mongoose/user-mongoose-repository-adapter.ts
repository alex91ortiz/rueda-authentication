import { IAddUserRepository } from "@/domain/models/gateways/add-user-repository";
import { ICheckEmailRepository } from "@/domain/models/gateways/check-email-repository";
import { IGetUsersRepository } from "@/domain/models/gateways/get-users-repository";
import { ILoadAccountTokenRepository } from "@/domain/models/gateways/load-account-token-repository";
import { ISetUserRepository } from "@/domain/models/gateways/set-user-repository";
import { IUpdateAccessTokenRepository } from "@/domain/models/gateways/update-access-token-repository";
import { AddUserParams, UserModel } from "@/domain/models/user";
import { UserModelSchema } from "@/infrastructure/driven-adapters/adapters/orm/mongoose/models/user";
import mongoose from "mongoose";

export class UserMongooseRepositoryAdapter implements IAddUserRepository,
    ICheckEmailRepository,
    IUpdateAccessTokenRepository,
    IGetUsersRepository,
    ILoadAccountTokenRepository,
    ISetUserRepository {



    map(data: any): any {
        const { _id, name, firstName, lastName, email, password, enable, locked } = data;
        return Object.assign({}, { id: _id.toString(), name, firstName, lastName, email, password, enable, locked })
    }
    async checkMail(email: string): Promise<ICheckEmailRepository.Result> {
        const user = await UserModelSchema.findOne({ email }).exec();
        return user && this.map(user);
    };
    async addUser(data: AddUserParams): Promise<UserModel> {
        return await UserModelSchema.create(data);
    };

    async updateToken(id: string | number, token: string): Promise<void> {
        await UserModelSchema.updateOne({
            _id: id
        }, {
            $set: {
                accessToken: token
            }
        }, {
            upsert: true
        }
        );
    }

    async loadToken(token: string): Promise<ILoadAccountTokenRepository.Result> {
        let objectFilter: {}
        objectFilter["_id"] = new mongoose.mongo.ObjectId(token);
        const result = await UserModelSchema.findOne(objectFilter);
        return this.map(result);
    }
    async getUsersRepository(): Promise<UserModel[]> {
        return UserModelSchema.find();
    }

    async addComplementalDataUser(id: string | number, data: AddUserParams): Promise<void> {
        let objectFilter = {};
        
        if(data.information) objectFilter["information"]=data.information;
        if(data.emergency) objectFilter["emergency"]=data.emergency;
        if(data.health) objectFilter["health"]=data.health;

        await UserModelSchema.findOneAndUpdate({ _id: id },
            objectFilter
        ,{
            upsert : true
        });
    }

    async updateUser(id: string | number, data: AddUserParams): Promise<void>{

        await UserModelSchema.findOneAndUpdate({ _id: id },
            data
        ,{
            upsert : true
        });
    }


    async getUserByIdRepository(userId: string): Promise<UserModel>{
        return await UserModelSchema.findOne({_id: userId}).exec();
    }

    async getUserByAccessTokenRepository(token: string): Promise<UserModel>{
        return await UserModelSchema.findOne({accessToken: token}).exec();
    }
}
