// import necessary things
import { Schema, model, Document } from 'mongoose';

// request interface
export interface IRequest extends Document {
    requestId: string;
    email: string;
    title: string;
    tags: string[];
    description?: string;
    status: 'Open' | 'In progress' | 'Rejected' | 'Pending';
    createdAt: Date;
}

// RequestSchema
const RequestSchema = new Schema<IRequest>({
    requestId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: [String],
        default: ['General']
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Open', 'In progress', 'Rejected', 'Pending'],
        default: 'Open'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// export model
export const RequestModel = model<IRequest>('Request', RequestSchema);