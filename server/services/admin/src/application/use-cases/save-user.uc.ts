import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { IAdminRepo } from "../interfaces/admin-repo.interface.ts";
import { ISaveUserUseCase } from "../interfaces/use-case.interface.ts";
import { CreatedAt, Email, GameId, Name, Status } from "../../domain/value-objects/index.ts";
import { IUserCreatedEventListener } from "../interfaces/event-listner.interface.ts";

export class SaveUserUseCase implements ISaveUserUseCase {
    constructor(
        private readonly adminRepo: IAdminRepo,
        private readonly eventConsumer: IUserCreatedEventListener
    ) { }

    async execute(): Promise<void> {
        try {
            await this.eventConsumer.listen(async (data) => {
                console.log(data);
                const user = await this.adminRepo.findByGameId(GameId.create(data.gameId).getValue());
                if (user) {
                    return;
                }
                const response = await this.adminRepo.saveUser({
                    gameId: GameId.create(data.gameId).getValue(),
                    email: Email.create(data.email).getValue(),
                    name: Name.create(data.name).getValue(),
                    status: Status.create(data.status).getValue(),
                    createdAt: CreatedAt.create(new Date(data.createdAt).toISOString()).getValue()
                })

                if (!response) {
                    return;
                }

                console.log(`✅ User created: ${data.email}`)
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