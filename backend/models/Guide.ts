// import dependencies
import { Schema, model, Document } from 'mongoose';

// guide interdace
export interface IGuide extends Document {
    mdFileName: string;
    title: string;
    description: string;
    contributedBy: string;
    profileImage?: string;
    typeOfGuide: string;
    categoryOfGuide: string;
    upvotes: number;
    views: number;
    status: string;
    mdFileUrl?: string;
    createdAt: Date;
}

// guide schema
const GuideSchema = new Schema<IGuide>({
    mdFileName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    contributedBy: {
        type: String,
        required: true,
        trim: true
    },
    profileImage: {
        type: String,
        trim: true
    },
    typeOfGuide: {
        type: String,
        required: true,
        trim: true
    },
    categoryOfGuide: {
        type: String,
        required: true,
        trim: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'Active',
        trim: true
    },
    mdFileUrl: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// export model
export const Guide = model<IGuide>('Guide', GuideSchema);