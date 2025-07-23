import { IPlayerRepository } from "../../application/ports/interfaces/in-memory-player.repo.ts";
import { SocketDTO, SocketId, Value } from "../../application/ports/types/index.ts";

export class InMemoryPlayerRepository implements IPlayerRepository {
    private readonly players = new Map<SocketId, Value>()

    async add(input: SocketDTO): Promise<void> {
        this.players.set(input.socketId, {
            name: input.name,
            gameId: input.gameId,
            rating: input.rating,
            variant: input.variant
        });
    }

    async get(socketId: SocketId): Promise<Value | undefined> {
        return this.players.get(socketId);
    }

    async remove(socketId: SocketId): Promise<boolean> {
        return this.players.delete(socketId);
    }

    async has(socketId: SocketId): Promise<boolean> {
        return this.players.has(socketId);
    }
}