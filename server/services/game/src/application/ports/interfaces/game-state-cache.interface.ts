import { GameStateResponse } from "../types/index.ts";

export interface IGameStateCache {
    setGameState(matchRoomId: string, state: GameStateResponse): Promise<void>;
    getGameState(matchRoomId: string): Promise<GameStateResponse | null>;
    deleteGameState(matchRoomId: string): Promise<void>;
} 