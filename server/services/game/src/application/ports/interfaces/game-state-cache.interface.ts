import { IMove } from "../types/index.ts";

export interface IGameStateCache {
    addMove(matchRoomId: string, move: IMove): Promise<boolean>;
    undoMove(matchRoomId: string): Promise<IMove | null>;
    getMoves(matchRoomId: string): Promise<IMove[]>;
    deleteGame(matchRoomId: string): Promise<boolean>;
} 