// import necessary things
import { Schema, model, Document } from 'mongoose';

// user interface
export interface IUser extends Document {
    googleId: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    createdAt: Date;
}

// userschema
const userSchema = new Schema<IUser>({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    avatarUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// export user schema model
export const User = model<IUser>('OpenSetup-User', userSchema);