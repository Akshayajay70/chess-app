import { TokenPayload } from "../dtos/token-payload.ts";

export interface ITokenService {
    generateAccessToken(payload: TokenPayload): string;
    validateAccessToken(token: string): boolean;
    decodeAccessToken(token: string): TokenPayload | null;
}