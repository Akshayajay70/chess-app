import { TokenPayload } from "../dto/token-payload.ts";

export interface ITokenService {
    generateAccessToken(payload: TokenPayload): string;
    generateRefreshToken(payload: TokenPayload): string;
    validateAccessToken(token: string): boolean;
    validateRefreshToken(token: string): boolean;
    decodeAccessToken(token: string): TokenPayload | null;
    decodeRefreshToken(token: string): TokenPayload | null;
}
