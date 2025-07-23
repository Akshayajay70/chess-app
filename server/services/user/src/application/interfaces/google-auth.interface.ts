import { GoogleAuthDTO } from "../dto/google-auth.ts";
import { GoogleIdentityDTO } from "../dto/google-identity.ts";

export interface IGoogleAuthService {
    getGoogleAuthRedirectUrl(): string;
    getGoogleTokensFromCode(code: string): Promise<GoogleAuthDTO>;
    verifyGoogleToken(idToken: string): Promise<GoogleIdentityDTO>;
}
