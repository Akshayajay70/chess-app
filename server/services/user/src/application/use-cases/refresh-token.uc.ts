import { ITokenService } from "../interfaces/token-service.interface.ts";
import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { TokenError } from "../../domain/errors/token.error.ts";
import { IRefreshTokenUseCase, RefreshTokenInput, RefreshTokenOutput } from "../interfaces/use-cases.interface.ts";


export class RefreshTokenUseCase implements IRefreshTokenUseCase{
    constructor(private readonly tokenService: ITokenService) { }

    execute(input: RefreshTokenInput): RefreshTokenOutput {
        try {
            const { accessToken, refreshToken } = input;

            // Case 1: Use Access Token (decode it, then generate fresh tokens)
            if (accessToken && this.tokenService.validateAccessToken(accessToken)) {
                const payload = this.tokenService.decodeAccessToken(accessToken);
                if (!payload) throw new TokenError("Failed to decode access token");

                return {
                    accessToken: this.tokenService.generateAccessToken(payload),
                    refreshToken: this.tokenService.generateRefreshToken(payload),
                };
            }

            // Case 2: Use Refresh Token
            if (refreshToken && this.tokenService.validateRefreshToken(refreshToken)) {
                const payload = this.tokenService.decodeRefreshToken(refreshToken);
                if (!payload) throw new TokenError("Failed to decode refresh token");

                return {
                    accessToken: this.tokenService.generateAccessToken(payload),
                    refreshToken: this.tokenService.generateRefreshToken(payload),
                };
            }

            throw new UseCaseError("No valid token provided", new TokenError("Missing or invalid token"));
        } catch (error) {
            throw new UseCaseError(
                "Failed to create refresh token",
                error instanceof Error ? error : new Error("Unknown error")
            );
        }
    }
}
