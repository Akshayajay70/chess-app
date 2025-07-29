import { IEndGame } from '../ports/interfaces/use-case.interface.ts';
import { IGameStateCache } from '../ports/interfaces/game-state-cache.interface.ts';
import { IGameRepo } from '../ports/interfaces/game.repository.interface.ts';
import { EndGameRequest, GameStateResponse, SaveGameInput } from '../ports/types/index.ts';
import { UseCaseError } from '../../domain/errors/use-case.error.ts';

export class EndGameUseCase implements IEndGame {
    constructor(
        private readonly cache: IGameStateCache,
        private readonly gameRepo: IGameRepo
    ) { }

    async execute(input: EndGameRequest): Promise<GameStateResponse | null> {
        try {
            const moves = await this.cache.getMoves(input.matchRoomId);

            const finalState: SaveGameInput = {
                matchRoomId: input.matchRoomId,
                result: input.result,
                endType: input.endType,
                moves: moves
            }

            await this.gameRepo.saveFinalState(finalState);
            await this.cache.deleteGame(input.matchRoomId);

            return await this.gameRepo.find(input.matchRoomId);

        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : "Failed to end game",
                error instanceof Error
                    ? error
                    : new Error('Unknown error')
            );
        }
    }
} 