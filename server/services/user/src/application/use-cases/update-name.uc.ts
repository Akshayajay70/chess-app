import { Email, Name } from "../../domain/value-objects";
import { IUpdateNameUCOutput, IUpdateNameUseCase } from "../interfaces/use-cases.interface";
import { IUserRespository } from "../interfaces/user-repo.interface";
import { UseCaseError } from "../../domain/errors/use-case.error";
import { ITokenService } from "../interfaces/token-service.interface";

export class UpdateNameUseCase implements IUpdateNameUseCase {
    constructor(
        private readonly userRepo: IUserRespository,
        private readonly tokenService: ITokenService
    ) { }

    async execute(data: { email: string; newName: string }): Promise<IUpdateNameUCOutput> {
        try {
            const email = Email.create(data.email).getValue();
            const newName = Name.create(data.newName).getValue();

            const user = await this.userRepo.findByEmail(email);
            if (!user) return { success: false };
            if (user.name !== "guest") return { success: false };

            const result = await this.userRepo.updateName(email, newName);
            if (!result) return { success: false };

            const accessToken = this.tokenService.generateAccessToken({
                email,
                gameId: user.gameId,
                name: user.name,
                role: 'user'
            })
            const refreshToken = this.tokenService.generateRefreshToken({
                email,
                gameId: user.gameId,
                name: user.name,
                role: 'user'
            })

            return {
                success: true,
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        } catch (error) {
            throw new UseCaseError(
                "Failed to update user name",
                error instanceof Error ? error : new Error("Unknown error")
            );
        }
    }
}
