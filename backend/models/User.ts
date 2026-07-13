// import necessary things
import { Schema, model, Document } from 'mongoose';

// user interface
export interface IUser extends Document {
    googleId?: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    password?: string;
    createdAt: Date;
}

// userschema
const userSchema = new Schema<IUser>({
    googleId: {
        type: String,
        unique: true,
        sparse: true // sparse allows multiple documents to have 'undefined' googleId
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    displayName: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String
    },
    password: {
        type: String,
        select: false // Excludes password by default when querying users for safety
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// export user schema model
export const User = model<IUser>('OpenSetup-User', userSchema);