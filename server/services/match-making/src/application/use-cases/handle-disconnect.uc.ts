import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { IPlayerRepository } from "../ports/interfaces/in-memory-player.repo.ts";
import { IMatchMakingRepo } from "../ports/interfaces/match-making.repo.ts";
import { IHandleDisconnectUseCase } from "../ports/interfaces/uc.interface.ts";
import { SocketId } from "../ports/types/index.ts";

export class HandleDisconnectUseCase implements IHandleDisconnectUseCase {
    constructor(
        private readonly matchMakingRepo: IMatchMakingRepo,
        private readonly playerRepo: IPlayerRepository,
    ) { }

    async execute(socketId: SocketId): Promise<void> {
        try {
            const isPlayerInMemory = await this.playerRepo.has(socketId);
            if (!isPlayerInMemory) return;
            const player = await this.playerRepo.get(socketId);
            if (!player) return;
            const { rating, variant } = player;
            await this.playerRepo.remove(socketId)
            await this.matchMakingRepo.removeFromQueue(rating, variant)
        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : "Failed to create match",
                error instanceof Error
                    ? error
                    : new Error('Unknown error')
            );
        }
    }
}