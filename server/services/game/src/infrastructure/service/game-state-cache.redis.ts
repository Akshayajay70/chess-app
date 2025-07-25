import { config } from '../../config/index.ts';
import { IGameStateCache } from '../../application/ports/interfaces/game-state-cache.interface.ts';
import { GameStateResponse } from '../../application/ports/types/index.ts';
import { createClient } from 'redis';

// Create a singleton Redis client
const redisClient = createClient({
    url: config.redisUrl
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Connect once at module load
(async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
})();

export class GameStateCacheRedis implements IGameStateCache {
    async setGameState(gameId: string, state: GameStateResponse): Promise<void> {
        await redisClient.set(`game:${gameId}`, JSON.stringify(state));
    }
    async getGameState(gameId: string): Promise<GameStateResponse | null> {
        const data = await redisClient.get(`game:${gameId}`);
        return data ? JSON.parse(data) as GameStateResponse : null;
    }
    async deleteGameState(gameId: string): Promise<void> {
        await redisClient.del(`game:${gameId}`);
    }
} 