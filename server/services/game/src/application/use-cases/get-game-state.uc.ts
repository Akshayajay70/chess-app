import { IGetGameState } from '../ports/interfaces/use-case.interface.ts';
import { IGameStateCache } from '../ports/interfaces/game-state-cache.interface.ts';
import { GetGameStateRequest, GameStateResponse } from '../ports/types/index.ts';

export class GetGameStateUseCase implements IGetGameState {
    constructor(
        private readonly cache: IGameStateCache
    ) {}

    async execute(input: GetGameStateRequest): Promise<GameStateResponse | null> {
        console.log('usecase',input)
        return await this.cache.getGameState(input.matchRoomId);
    }
} 