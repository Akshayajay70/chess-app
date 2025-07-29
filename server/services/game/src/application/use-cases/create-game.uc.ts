import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { IGameRepo } from "../ports/interfaces/game.repository.interface.ts";
import { ICreateGame } from "../ports/interfaces/use-case.interface.ts";
import { MatchFindRequest, MatchFindResponse } from "../ports/types/index.ts";
import { GameId, Rating, Variant } from "../../domain/value-objects/index.ts";

export class CreateGameUseCase implements ICreateGame {
    constructor(
        private readonly gameRepo: IGameRepo,
    ) { };

    async execute(input: MatchFindRequest): Promise<MatchFindResponse> {
        try {
            const playerA = {
                gameId: GameId.create(input.playerA.gameId).getValue(),
                name: input.playerA.name,
                rating: Rating.create(input.playerA.rating).getValue()
            }
            const playerB = {
                gameId: GameId.create(input.playerB.gameId).getValue(),
                name: input.playerB.name,
                rating: Rating.create(input.playerB.rating).getValue()
            }
            const variant = Variant.create(input.variant).getValue();

            const response = await this.gameRepo.create({
                playerA,
                playerB,
                gameType: input.gameType,
                variant
            });
            console.log(response);
            return response;

        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : "Failed to create match room",
                error instanceof Error
                    ? error
                    : new Error('Unknown error')
            );
        }
    }
}