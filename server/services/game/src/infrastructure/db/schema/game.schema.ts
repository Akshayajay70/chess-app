import { Schema } from 'mongoose';
import { moveSchema } from './move.schema';
import {
    endTypes,
    Game,
    gameResults,
    IPlayer,
    variants,
    IGameSchema
} from '../../../application/ports/types/index';


const playerSchema = new Schema<IPlayer>(
    {
        gameId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        }
    },
    { _id: false }
);

export const gameSchema = new Schema<IGameSchema>(
    {
        whitePlayer: {
            type: playerSchema,
            required: true
        },
        blackPlayer: {
            type: playerSchema,
            required: true
        },
        varientName: {
            type: String,
            enum: variants,
            required: true
        },
        gameType: {
            type: String,
            enum: Game,
            required: true
        },
        moves: [moveSchema],
        result: {
            type: String,
            enum: gameResults,
            default: null
        },
        endType: {
            type: String,
            enum: endTypes,
            default: null
        },
        pgn: {
            type: String,
            default: null
        }
    },
    { timestamps: true }
);


