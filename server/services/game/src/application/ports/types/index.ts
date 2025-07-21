import { VariantType } from "../../../domain/value-objects/variants.vo";
export { type VariantType, variants } from "../../../domain/value-objects/variants.vo";
export const PlayerColor = ['white', 'black']
export const PromotionPiece = ['q', 'r', 'b', 'n']
export type PlayerColorType = typeof PlayerColor[number];
export type PromotionPieceType = typeof PromotionPiece[number];
export type IMove = {
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
export const Game = ['friend', 'online', 'war'];
export type GameType = typeof Game[number];
export const gameResults = ['1-0', '0-1', '½-½', '0-0'];
export type GameResultType = typeof gameResults[number];
export const endTypes = [
    'checkmate',
    'resignation',
    'timeout',
    'stalemate',
    'draw-agreement',
    'insufficient-material',
    'threefold-repetition',
    'abandonment'
];
export type EndType = typeof endTypes[number];

export type IPlayer = {
    gameId: string;
    name: string;
    rating: number;
}

export type IGameSchema = {
    whitePlayer: IPlayer;
    blackPlayer: IPlayer;
    varientName: VariantType;
    gameType: GameType;
    moves: IMove[];
    result?: GameResultType | null;
    endType: EndType;
    pgn: string;
    createdAt: Date;
    updatedAt: Date;
}

export type IVariantSchema = {
    varientName: VariantType;
    timeBase: number;
    timeInc: number;
}

export type MatchFindRequest = {
    playerA: IPlayer,
    playerB: IPlayer,
    gameType: GameType,
    variant: VariantType
}

export type MatchFindResponse = {
    matchRoomId: string,
    whitePlayer: IPlayer,
    blackPlayer: IPlayer,
    variant: VariantType
}