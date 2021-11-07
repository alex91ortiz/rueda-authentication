import { ConfirmationTokenModel } from '@/domain/models/confirmation-token';
import { model, Schema } from "mongoose";

const schema = new Schema<ConfirmationTokenModel>({
    id: String,
    accessToken: String,
    userId: String
});

export const ConfirmationTokenModelSchema = model<ConfirmationTokenModel>('confirmation_tokens', schema);
