import { VariantType } from "./variant.entitie.ts";
import { Move } from "./move.entitie.ts";

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
    moves: Move[];
    result?: GameResultType | null;
    endType: EndType;
    pgn: string;
    createdAt: Date;
    updatedAt: Date;
}