import jwt from "jsonwebtoken";
import { TokenPayload } from "../../application/dto/token-payload.ts";
import { ITokenService } from "../../application/interfaces/token-service.interface.ts";
import { config } from "../../config/index.ts";
import { TokenError } from "../../domain/errors/token.error.ts";

export class JwtService implements ITokenService {
    generateAccessToken(payload: TokenPayload): string {
        return jwt.sign(payload, config.jwtSecretAccess, {
            expiresIn: config.jwtAccessExp,
        });
    }

    generateRefreshToken(payload: TokenPayload): string {
        return jwt.sign(payload, config.jwtSecretRefresh, {
            expiresIn: config.jwtRefreshExp,
        });
    }

    validateAccessToken(token: string): boolean {
        try {
            jwt.verify(token, config.jwtSecretAccess);
            return true;
        } catch {
            return false;
        }
    }

    validateRefreshToken(token: string): boolean {
        try {
            jwt.verify(token, config.jwtSecretRefresh);
            return true;
        } catch {
            return false;
        }
    }

    decodeAccessToken(token: string): TokenPayload {
        try {
            return jwt.verify(token, config.jwtSecretAccess) as TokenPayload;
        } catch (error) {
            throw new TokenError("Invalid or expired access token");
        }
    }

    decodeRefreshToken(token: string): TokenPayload {
        try {
            return jwt.verify(token, config.jwtSecretRefresh) as TokenPayload;
        } catch (error) {
            throw new TokenError("Invalid or expired refresh token");
        }
    }
}
