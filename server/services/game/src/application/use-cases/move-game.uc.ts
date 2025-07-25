import { IMoveGame } from '../ports/interfaces/use-case.interface.ts';
import { IGameStateCache } from '../ports/interfaces/game-state-cache.interface.ts';
import { MoveGameRequest, MoveGameResponse, GameStateResponse } from '../ports/types/index.ts';

export class MoveGameUseCase implements IMoveGame {
    constructor(
        private readonly cache: IGameStateCache
    ) {}

    async execute(input: MoveGameRequest): Promise<MoveGameResponse> {
        // Get current game state from cache
        const state = await this.cache.getGameState(input.matchRoomId);
        console.log(state)
        if (!state || state.status !== 'ongoing') {
            return { success: false, message: 'Game not found or already ended' };
        }
        // Add move to moves array
        const newMoves = [...state.moves, input.move];
        const newState: GameStateResponse = { ...state, moves: newMoves };
        // Save updated state to cache
        await this.cache.setGameState(input.matchRoomId, newState);
        return { success: true, newState };
    }
} 