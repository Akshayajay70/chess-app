import { UseCaseError } from "@/domain/errors/use-case.error";
import { AdminResponse } from "../dtos/admin-response";
import { IAdminRepo } from "../interfaces/admin-repo.interface";
import { ISaveUserUseCase } from "../interfaces/use-case.interface";
import { CreatedAt, Email, GameId, Name, Status } from "@/domain/value-objects";

export class SaveUserUseCase implements ISaveUserUseCase {
    constructor(
        private readonly adminRepo: IAdminRepo
    ) { }

    async execute(data: AdminResponse): Promise<{ success: boolean; message: string; }> {
        try {

            const user = await this.adminRepo.findByGameId(GameId.create(data.gameId).getValue());
            if (user) {
                return {
                    success: false,
                    message: `User already exists`
                }
            }
            const response = await this.adminRepo.saveUser({
                gameId: GameId.create(data.gameId).getValue(),
                email: Email.create(data.email).getValue(),
                name: Name.create(data.name).getValue(),
                status: Status.create(data.status).getValue(),
                createdAt: CreatedAt.create(data.createdAt.toISOString()).getValue()
            })

            if (!response) {
                return {
                    success: false,
                    message: `Failed to create user`
                }
            }

            return {
                success: true,
                message: 'User created successfully'
            }
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