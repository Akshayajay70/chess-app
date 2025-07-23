import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { UserResponse } from "../dto/user-response.ts";
import { IGetUserUseCase } from "../interfaces/use-cases.interface.ts";
import { IUserRespository } from "../interfaces/user-repo.interface.ts";
import { GameId } from "../../domain/value-objects/index.ts";

export class GetUserUseCase implements IGetUserUseCase {
    constructor(
        private readonly userRepo: IUserRespository
    ) { }

    async execute(data: { gameId: string; }): Promise<UserResponse | null> {
        try {
            const gameId = GameId.create(data.gameId).getValue();
            const user = await this.userRepo.findByGameId(gameId);

            if (!user) return null;
            return user
        } catch (error) {
            throw new UseCaseError(
                "Failed to get user",
                error instanceof Error ? error : new Error("Unknown error")
            );
        }
    }
}