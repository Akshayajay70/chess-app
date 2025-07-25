import { IEndGame } from '../ports/interfaces/use-case.interface.ts';
import { IGameStateCache } from '../ports/interfaces/game-state-cache.interface.ts';
import { IGameRepo } from '../ports/interfaces/game.repository.interface.ts';
import { EndGameRequest, EndGameResponse, GameStateResponse } from '../ports/types/index.ts';

export class EndGameUseCase implements IEndGame {
    constructor(
        private readonly cache: IGameStateCache,
        private readonly gameRepo: IGameRepo
    ) {}

    async execute(input: EndGameRequest): Promise<EndGameResponse> {
        // Get current game state from cache
        const state = await this.cache.getGameState(input.gameId);
        if (!state || state.status !== 'ongoing') {
            return { success: false, message: 'Game not found or already ended' };
        }
        // Mark game as ended
        const finalState: GameStateResponse = {
            ...state,
            status: 'ended',
            result: input.result,
            endType: input.endType
        };
        // Persist to DB
        await this.gameRepo.saveFinalState(finalState);
        // Remove from cache
        await this.cache.deleteGameState(input.gameId);
        return { success: true, finalState };
    }
} 