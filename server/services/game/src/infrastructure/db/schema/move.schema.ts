import { IMove, PlayerColor, PromotionPiece } from "../../../application/ports/types/index.ts";
import { Schema } from "mongoose";

export const moveSchema = new Schema<IMove>({
    moveNumber: { type: Number, required: true },
    ply: { type: Number, required: true },
    playerColor: { type: String, enum: PlayerColor, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    san: { type: String, required: true },
    isCheck: { type: Boolean, default: false },
    isCheckmate: { type: Boolean, default: false },
    clockBefore: { type: Number, required: true },
    clockAfter: { type: Number, required: true },
    promotion: {
        type: String,
        enum: PromotionPiece,
        default: null
    },
}, {
    _id: false
});