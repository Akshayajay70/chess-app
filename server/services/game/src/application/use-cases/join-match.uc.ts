import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { IGameRepo } from "../ports/interfaces/game.repository.interface.ts";
import { IJoinMatch } from "../ports/interfaces/use-case.interface.ts";
import { JoinMatchResponse } from "../ports/types/index.ts";

export class JoinMatchUseCase implements IJoinMatch {
    constructor(
        private readonly gameRepo: IGameRepo
    ) { }

    async execute(matchRoomId: string, gameId: string): Promise<JoinMatchResponse> {
        try {
            const matchData = await this.gameRepo.find(matchRoomId);
            if (!matchData) {
                return { success: false, message: 'Invalid matchRoom' };
            }

            if (matchData.result) {
                return { success: false, message: 'Match ended' };
            }

            const playerExists = matchData.players.some(p => p.gameId === gameId);
            if (!playerExists) {
                return { success: false, message: 'Invalid Player' };
            }

            return { success: true };
        } catch (error) {
            throw new UseCaseError(
                `JoinMatchUseCase failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                error instanceof Error ? error : new Error(String(error))
            );
        }
    }
}
