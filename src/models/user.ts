import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { validate as validateEmail } from 'email-validator';

export interface IUser extends Document {
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

const UserSchema: Schema = new mongoose.Schema(
    {
        email: {
            type: String,
            index: true,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validateEmail, 'The email provided is not valid!'],
        },
        name: { type: String, required: true },
    },
    { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

export default mongoose.model<IUser>('User', UserSchema);
