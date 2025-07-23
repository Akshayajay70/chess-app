import { GameId, Status } from "../../domain/value-objects/index.ts";
import { IAdminRepo } from "../interfaces/admin-repo.interface.ts";
import { IUpdateStatusUseCase } from "../interfaces/use-case.interface.ts";
import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { IEventPublisher } from "../interfaces/event-publisher.interface.ts";

export class UpdateStatusUseCase implements IUpdateStatusUseCase {
    constructor(
        private readonly adminRepo: IAdminRepo,
        private readonly eventPublisher: IEventPublisher
    ) { }

    async execute(gameId: string, status: string): Promise<{ success: boolean, message: string }> {
        try {
            const validatedGameId = GameId.create(gameId).getValue();
            const validatedStatus = Status.create(status).getValue();

            const user = await this.adminRepo.findByGameId(validatedGameId);
            if (!user) {
                return {
                    success: false,
                    message: "No user found"
                }
            }
            const response = await this.adminRepo.updateStatus(validatedGameId, validatedStatus);

            if (!response) {
                return {
                    success: false,
                    message: "Failed to update user"
                }
            }
            await this.eventPublisher.publish("user.status.updated", {
                gameId: gameId,
                status: status
            })
            return {
                success: true,
                message: "User status updated successfully"
            }
        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : "updating status failed",
                error instanceof Error
                    ? error
                    : new Error('Unknown error'))
        }
    }
}