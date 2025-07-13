import { GoogleAuthDTO } from "../dto/google-auth";
import { GoogleIdentityDTO } from "../dto/google-identity";

export interface IGoogleAuthService {
    getGoogleAuthRedirectUrl(): string;
    getGoogleTokensFromCode(code: string): Promise<GoogleAuthDTO>;
    verifyGoogleToken(idToken: string): Promise<GoogleIdentityDTO>;
}
