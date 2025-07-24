import { FromUserService, ToResponse } from "../../../application/ports/types/index.ts";
import { IRatingRepo } from "../../../application/ports/interfaces/rating-repo.interface.ts";
import { DatabaseError } from "../../../domain/errors/database.error.ts";
import { RatingModel } from "../models/game.model.ts";

export class RatingRepository implements IRatingRepo {
    async save(input: FromUserService): Promise<boolean> {
        try {
            const result = await RatingModel.create({
                gameId: input.gameId,
                name: input.name,
            })
            if (!result) return false;
            return true;
        } catch (error) {
            throw new DatabaseError("CREATE", "Rating", error instanceof Error ? error : undefined);
        }
    }

    async findByGameId(gameId: string): Promise<ToResponse | null> {
        try {
            const result = await RatingModel.findOne({ gameId: gameId });

            return result
                ? {
                    gameId: result.gameId,
                    name: result.name,
                    ratings: result.ratings
                }
                : null
        } catch (error) {
            throw new DatabaseError("READ", "Rating", error instanceof Error ? error : undefined);
        }
    }
}