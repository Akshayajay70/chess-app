import { GameId, Name } from "../../domain/value-objects";
import { IGoogleAuthService } from "../interfaces/google-auth.interface";
import { IAuthGoogleUCOutput, type IAuthGoogleUserUseCase } from "../interfaces/use-cases.interface";
import { IUserRespository } from "../interfaces/user-repo.interface";
import { UserEntity } from "../../domain/entities/user.entitie";
import { UseCaseError } from "../../domain/errors/use-case.error";
import { ITokenService } from "../interfaces/token-service.interface";
import { IEventPublisher } from "../interfaces/event-publisher.interface";

export class AuthGoogleUserUseCase implements IAuthGoogleUserUseCase {
    constructor(
        private readonly googleService: IGoogleAuthService,
        private readonly userRepo: IUserRespository,
        private readonly tokenService: ITokenService,
        private readonly eventPublisher: IEventPublisher
    ) { }

    async execute(code: string): Promise<IAuthGoogleUCOutput> {
        try {
            const { idToken } = await this.googleService.getGoogleTokensFromCode(code);
            const { email, name, googleId } = await this.googleService.verifyGoogleToken(idToken);

            let user = await this.userRepo.findByEmail(email);

            if (!user) {

                let gameId = GameId.generate().getValue();
                while (await this.userRepo.findByGameId(gameId)) {
                    gameId = GameId.generate().getValue();
                }

                const userEntity = UserEntity.create(
                    gameId,
                    googleId,
                    name,
                    email,
                    "active"
                );

                user = await this.userRepo.create(userEntity);
                await this.eventPublisher.publish("user.created", user)

            }

            const accessToken = this.tokenService.generateAccessToken({
                email: user.email,
                gameId: user.gameId,
                role: 'user'
            });

            const refreshToken = this.tokenService.generateRefreshToken({
                email: user.email,
                gameId: user.gameId,
                role: 'user'
            });

            return {
                user,
                accessToken,
                refreshToken
            };
        } catch (error) {
            throw new UseCaseError(
                "Failed to create or fetch user from Google auth flow",
                error instanceof Error ? error : new Error("Unknown error")
            );
        }
    }
}
