import { IRating } from "../../../application/ports/types/index.ts";
import { Schema } from "mongoose";

export const ratingSchema = new Schema<IRating>({
    name: {
        type: String,
        required: true,
    },
    gameId: {
        type: String,
        required: true,
    },
    ratings: {
        bullet: {
            type: Number,
            default: 1200,
            min: 0,
            max: 3500
        },
        blitz: {
            type: Number,
            default: 1200,
            min: 0,
            max: 3500
        },
        rapid: {
            type: Number,
            default: 1200,
            min: 0,
            max: 3500
        },
        classic: {
            type: Number,
            default: 1200,
            min: 0,
            max: 3500
        }
    }
}, {
    timestamps: true
});
