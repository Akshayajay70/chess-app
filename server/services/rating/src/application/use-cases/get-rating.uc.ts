import { GameId } from "../../domain/value-objects/gameId.vo.ts";
import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { IRatingRepo } from "../ports/interfaces/rating-repo.interface.ts";
import { IGetRatingUseCase } from "../ports/interfaces/uc.interface.ts";
import { ToResponse } from "../ports/types/index.ts";

export class GetRatingUseCase implements IGetRatingUseCase {
    constructor(
        private readonly ratingRepo: IRatingRepo
    ) { }

    async execute(gameId: string): Promise<ToResponse | null> {
        try {
            const validatedGameId = GameId.create(gameId).getValue();
            const result = await this.ratingRepo.findByGameId(validatedGameId);
            return result;
        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : "Failed getting user rating",
                error instanceof Error
                    ? error
                    : new Error('Unknown error'))
        }
    }
}