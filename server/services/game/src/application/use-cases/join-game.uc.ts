import { IJoinGame } from '../ports/interfaces/use-case.interface.ts';
import { JoinGameRequest, JoinGameResponse, GameStateResponse, IPlayer } from '../ports/types/index.ts';
import { IGameStateCache } from '../ports/interfaces/game-state-cache.interface.ts';
import { IGameRepo } from '../ports/interfaces/game.repository.interface.ts';

export class JoinGameUseCase implements IJoinGame {
    constructor(
        private readonly cache: IGameStateCache,
        private readonly gameRepo: IGameRepo
    ) {}

    async execute(input: JoinGameRequest): Promise<JoinGameResponse> {
        // Validate matchRoomId by checking if game state exists in cache
        const state: GameStateResponse | null = await this.cache.getGameState(input.matchRoomId);
        if (!state) {
            const gameState = await this.gameRepo.find(input.matchRoomId);
            if(!gameState) {
                return {
                    success: false
                }
            }
            await this.cache.setGameState(gameState.matchRoomId, gameState);
        }
        
        return {
            success: true,
        };
    }
}
