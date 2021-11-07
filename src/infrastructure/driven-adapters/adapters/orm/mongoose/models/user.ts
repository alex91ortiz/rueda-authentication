import { UserModel } from '@/domain/models/user';
import { model, Schema } from "mongoose";

const schema = new Schema<UserModel>({
    id: String,
    name: String,
    identification: Number,
    serial: String,
    firstName: String,
    lastName: String,
    profileImage: String,
    email: String,
    password: String,
    accessToken: String,
    enable: Boolean,
    locked: Boolean,
    information:  {
        birthday: String,
        country: String,
        state: String,
        city: String,
        address: String,
        phone: Number,
    },
    health:{
        typeBlood: String,
        allergy: String,
        medicines: String,
        sickness: String,
    },
    emergency:{
        contact: String,
        phone: Number,
        relationship: String,
    }
});

export const UserModelSchema = model<UserModel>('users', schema);
