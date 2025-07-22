import * as yup from 'yup';
import { PlayerColor, PromotionPiece } from '../types';

export const moveValidator = yup.object({
    moveNumber: yup.number().required(),
    ply: yup.number().required(),
    playerColor: yup.string().oneOf(PlayerColor).required(),
    from: yup.string().required(),
    to: yup.string().required(),
    san: yup.string().required(),
    isCheck: yup.boolean().required(),
    isCheckmate: yup.boolean().required(),
    clockBefore: yup.number().required(),
    clockAfter: yup.number().required(),
    promotion: yup.string().oneOf(PromotionPiece).nullable()
});
