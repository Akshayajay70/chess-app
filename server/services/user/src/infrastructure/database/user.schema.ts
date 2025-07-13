import { Schema } from 'mongoose';

export const UserSchema = new Schema(
    {
        gameId: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        googleId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxLength: 20
        },
        status: {
            type: String,
            enum: ['active', 'banned', 'suspended'], default: "active"
        },
    },
    {
        timestamps: true
    }
);