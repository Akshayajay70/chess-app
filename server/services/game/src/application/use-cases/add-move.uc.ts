import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { IGameStateCache } from "../ports/interfaces/game-state-cache.interface.ts";
import { IAddMove } from "../ports/interfaces/use-case.interface.ts";
import { AddMoveRequest } from "../ports/types/index.ts";
import { moveValidator } from "../ports/validator/move-validator.ts";

export class AddMoveUseCase implements IAddMove{
    constructor(
        private readonly cache: IGameStateCache
    ) { }

    async execute(input: AddMoveRequest): Promise<void> {
        try {
            const matchRoomId = input.matchRoomId;
            const moves = await moveValidator.validate(input.move);

            await this.cache.addMove(matchRoomId, moves)
        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : "Failed to add move",
                error instanceof Error
                    ? error
                    : new Error('Unknown error')
            );
        }
    }
}