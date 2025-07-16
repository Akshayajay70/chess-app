import { UseCaseError } from "@/domain/errors/use-case.error";
import { IUserCreatedEventListener } from "../interfaces/event-listner.interface";
import { IUpdateStatusUseCase } from "../interfaces/use-cases.interface";
import { IUserRespository } from "../interfaces/user-repo.interface";
import { GameId, Status } from "@/domain/value-objects";

export class UpdateStatusUseCase implements IUpdateStatusUseCase {
    constructor(
        private readonly userRepo: IUserRespository,
        private readonly eventConsumer: IUserCreatedEventListener
    ) { }

    async execute(): Promise<void> {
        try {
            await this.eventConsumer.listen(async (data) => {
                console.log(data);
                const user = await this.userRepo.findByGameId(
                    GameId.create(data.gameId).getValue()
                )
                if (!user) return;
                const response = await this.userRepo.updateStatus(
                    GameId.create(data.gameId).getValue(),
                    Status.create(data.status).getValue()
                )
                if (!response) return;
                console.log(`✅ User: ${data.gameId} status changed: ${data.status}`)
            })
        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : "User status change failed",
                error instanceof Error
                    ? error
                    : new Error('Unknown error'))
        }
    }
}