export const PlayerColor = ['white', 'black']
export const PromotionPiece = ['q', 'r', 'b', 'n']
export type PlayerColorType = typeof PlayerColor[number];
export type PromotionPieceType = typeof PromotionPiece[number];
export interface Move {
    moveNumber: number;
    ply: number;
    playerColor: PlayerColorType;
    from: string;
    to: string;
    san: string;
    isCheck: boolean;
    isCheckmate: boolean;
    clockBefore: number;
    clockAfter: number;
    promotion: PromotionPieceType | null;
}