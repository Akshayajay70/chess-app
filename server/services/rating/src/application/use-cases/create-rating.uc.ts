import { GameId } from "../../domain/value-objects/gameId.vo.ts";
import { Name } from "../../domain/value-objects/name.vo.ts";
import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { IUserCreatedEventListener } from "../ports/interfaces/event-listner.interface.ts";
import { IRatingRepo } from "../ports/interfaces/rating-repo.interface.ts";
import { ICreateUserRatingUseCase } from "../ports/interfaces/uc.interface.ts";

export class CreateUserRatingUseCase implements ICreateUserRatingUseCase {
    constructor(
        private readonly ratingRepo: IRatingRepo,
        private readonly eventConsumer: IUserCreatedEventListener
    ) { };

    async execute(): Promise<void> {
        try {
            await this.eventConsumer.listen(async (data) => {
                console.log(data);
                const user = await this.ratingRepo.findByGameId(GameId.create(data.gameId).getValue());
                if (user) return;
                const response = await this.ratingRepo.save({
                    gameId: GameId.create(data.gameId).getValue(),
                    email: data.email,
                    name: Name.create(data.name).getValue(),
                    status: data.status
                })

                if (!response) return;
                console.log(`✅ User created: ${data.gameId}`)
            })
        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : "User saving failed",
                error instanceof Error
                    ? error
                    : new Error('Unknown error'))
        }
    }
}