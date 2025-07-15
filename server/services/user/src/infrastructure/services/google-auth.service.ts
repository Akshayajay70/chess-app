import { OAuth2Client } from 'google-auth-library';
import { IGoogleAuthService } from '../../application/interfaces/google-auth.interface';
import { GoogleIdentityDTO } from '../../application/dto/google-identity';
import { GoogleAuthDTO } from '../../application/dto/google-auth';
import { config } from '../../config';
import { GoogleAuthError } from '../../domain/errors/google-auth.error';

export class GoogleAuthService implements IGoogleAuthService {
    private readonly oauth2Client: OAuth2Client;
    private readonly redirectUri: string;

    constructor() {
        this.oauth2Client = new OAuth2Client(
            config.googleClientId,
            config.googleClientSecret,
            'http://localhost:8000/auth/google/callback'
        );
        this.redirectUri = 'http://localhost:8000/auth/google/callback';
    }

    getGoogleAuthRedirectUrl(): string {
        return this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',
                'openid'
            ],
            prompt: 'consent'
        });
    }

    async getGoogleTokensFromCode(code: string): Promise<GoogleAuthDTO> {
        try {
            const { tokens } = await this.oauth2Client.getToken({
                code,
                redirect_uri: this.redirectUri
            });

            if (!tokens.id_token) {
                throw new GoogleAuthError('ID_TOKEN_MISSING', 'No ID token received from Google');
            }

            const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokens.access_token}` }
            });

            if (!userInfoResponse.ok) {
                throw new GoogleAuthError('USER_INFO_FETCH_FAILED', 'Failed to get user info from Google');
            }

            const userInfo = await userInfoResponse.json();

            return {
                accessToken: tokens.access_token!,
                refreshToken: tokens.refresh_token || '',
                idToken: tokens.id_token,
                userInfo
            };
        } catch (error) {
            throw new GoogleAuthError('TOKEN_RETRIEVAL_FAILED', 'Failed to get tokens from Google');
        }
    }

    async verifyGoogleToken(idToken: string): Promise<GoogleIdentityDTO> {
        try {
            const ticket = await this.oauth2Client.verifyIdToken({
                idToken,
                audience: config.googleClientId
            });

            const payload = ticket.getPayload();
            if (!payload) {
                throw new GoogleAuthError('ID_TOKEN_INVALID', 'Invalid Google ID token');
            }

            const name = payload.family_name
                ? `${payload.given_name} ${payload.family_name}`
                : payload.given_name

            return {
                email: payload.email!,
                name: name!,
                googleId: payload.sub
            };
        } catch (error) {
            throw new GoogleAuthError('TOKEN_VERIFICATION_FAILED', 'Failed to verify Google ID token');
        }
    }
}
