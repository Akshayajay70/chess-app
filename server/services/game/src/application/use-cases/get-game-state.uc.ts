import { IGetGameState } from '../ports/interfaces/use-case.interface.ts';
import { GameStateResponse } from '../ports/types/index.ts';
import { UseCaseError } from '../../domain/errors/use-case.error.ts';
import { IGameRepo } from '../ports/interfaces/game.repository.interface.ts';

export class GetGameStateUseCase implements IGetGameState {
    constructor(
        private readonly repo: IGameRepo
    ) { }

    async execute(matchRoomId: string): Promise<GameStateResponse | null> {
        try {
            return await this.repo.find(matchRoomId);
        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : "Failed to get game",
                error instanceof Error
                    ? error
                    : new Error('Unknown error')
            );
        }
    }
} 