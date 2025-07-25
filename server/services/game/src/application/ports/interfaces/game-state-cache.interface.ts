import { GameStateResponse } from "../types/index.ts";

export interface IGameStateCache {
    setGameState(gameId: string, state: GameStateResponse): Promise<void>;
    getGameState(gameId: string): Promise<GameStateResponse | null>;
    deleteGameState(gameId: string): Promise<void>;
} 