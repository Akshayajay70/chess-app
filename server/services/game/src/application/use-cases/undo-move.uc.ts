import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { IGameStateCache } from "../ports/interfaces/game-state-cache.interface.ts";
import { IUndoMove } from "../ports/interfaces/use-case.interface.ts";
import { IMove } from "../ports/types/index.ts";

export class UndoMoveUseCase implements IUndoMove {
    constructor(
        private readonly cache: IGameStateCache
    ) { }

    async execute(matchRoomId: string): Promise<IMove | null> {
        try {
            return await this.cache.undoMove(matchRoomId);
        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : "Failed to undo move",
                error instanceof Error
                    ? error
                    : new Error('Unknown error')
            );
        }
    }
}