import { config } from '../../config/index.ts';
import { IGameStateCache } from '../../application/ports/interfaces/game-state-cache.interface.ts';
import { createClient } from 'redis';
import { IMove } from '../../application/ports/types/index.ts';
import { CacheError } from '../../domain/errors/cache.error.ts';

const { REDIS_URL } = config;

export class GameStateCacheRedis implements IGameStateCache {
    private client;

    constructor() {
        this.client = createClient({ url: REDIS_URL });

        this.client.connect()
            .then(() => console.log("✅ Redis connected successfully"))
            .catch((err) =>
                console.error(
                    "❌ Error connecting to Redis:",
                    err instanceof Error
                        ? err.message
                        : "Failed to connect to Redis"
                )
            );
    }
    async addMove(matchRoomId: string, move: IMove): Promise<boolean> {
        try {
            const add = await this.client.rPush(`game:${matchRoomId}`, JSON.stringify(move));
            return add === 1;
        } catch (error) {
            throw new CacheError(
                error instanceof Error
                    ? error.message
                    : 'Failed to add move in cache'
            )
        }
    }

    async undoMove(matchRoomId: string): Promise<IMove | null> {
        try {
            const length = await this.client.lLen(`game:${matchRoomId}`);
            return length > 0
                ? JSON.parse(await this.client.rPop(`game:${matchRoomId}`) as string) as IMove
                : null
        } catch (error) {
            throw new CacheError(
                error instanceof Error
                    ? error.message
                    : 'Failed to undo move in cache'
            )
        }
    }

    async getMoves(matchRoomId: string): Promise<IMove[]> {
        try {
            const moves = await this.client.lRange(`game:${matchRoomId}`, 0 , -1);
            return moves.map((move) => JSON.parse(move));
        } catch (error) {
            throw new CacheError(
                error instanceof Error
                    ? error.message
                    : 'Failed to get moves in cache'
            )
        }
    }

    async deleteGame(matchRoomId: string): Promise<boolean> {
        try {
            const deleted = await this.client.del(`game:${matchRoomId}`);
            return deleted === 1;
        } catch (error) {
            throw new CacheError(
                error instanceof Error
                    ? error.message
                    : 'Failed to delete game in cache'
            )
        }
    }
} 