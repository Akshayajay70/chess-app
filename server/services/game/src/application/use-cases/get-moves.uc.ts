import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { IGameStateCache } from "../ports/interfaces/game-state-cache.interface.ts";
import { IGetMoves } from "../ports/interfaces/use-case.interface.ts";
import { IMove } from "../ports/types/index.ts";

export class GetMovesUseCase implements IGetMoves {
    constructor(
        private readonly cache: IGameStateCache
    ) { }

    async execute(matchRoomId: string): Promise<IMove[]> {
        try {
            const moves = await this.cache.getMoves(matchRoomId);
            return moves;
        } catch (error) {
            throw new UseCaseError(
                `GetMovesUseCase failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                error instanceof Error ? error : new Error(String(error))
            );
        }
    }
}