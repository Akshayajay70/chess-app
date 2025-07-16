import jwt from "jsonwebtoken";
import { TokenPayload } from "../../application/dtos/token-payload";
import { ITokenService } from "../../application/interfaces/token.interface";
import { config } from "../../config/index";
import { TokenError } from "../../domain/errors/token.error";

export class JwtService implements ITokenService {
    generateAccessToken(payload: TokenPayload): string {
        return jwt.sign(payload, config.jwtSecretAccess, {
            expiresIn: config.jwtAccessExp,
        });
    }

    validateAccessToken(token: string): boolean {
        try {
            jwt.verify(token, config.jwtSecretAccess);
            return true;
        } catch {
            throw new TokenError("Invalid or expired access token");
        }
    }

    decodeAccessToken(token: string): TokenPayload {
        try {
            return jwt.verify(token, config.jwtSecretAccess) as TokenPayload;
        } catch (error) {
            throw new TokenError("Invalid or expired access token");
        }
    }
}
