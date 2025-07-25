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
    async setGameState(matchRoomId: string, state: GameStateResponse): Promise<void> {
        console.log(matchRoomId, state)
        await redisClient.set(`game:${matchRoomId}`, JSON.stringify(state));
    }
    async getGameState(matchRoomId: string): Promise<GameStateResponse | null> {
        console.log('redis', matchRoomId)
        const data = await redisClient.get(`game:${matchRoomId}`);
        return data ? JSON.parse(data) as GameStateResponse : null;
    }
    async deleteGameState(matchRoomId: string): Promise<void> {
        await redisClient.del(`game:${matchRoomId}`);
    }
} 