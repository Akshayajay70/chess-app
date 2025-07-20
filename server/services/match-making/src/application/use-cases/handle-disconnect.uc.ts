import { UseCaseError } from "@/domain/errors/use-case.error";
import { IPlayerRepository } from "../ports/interfaces/in-memory-player.repo";
import { IMatchMakingRepo } from "../ports/interfaces/match-making.repo";
import { IHandleDisconnectUseCase } from "../ports/interfaces/uc.interface";
import { SocketId } from "../ports/types";

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
            const { rating } = player;
            await this.playerRepo.remove(socketId)
            await this.matchMakingRepo.removeFromQueue(rating)
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