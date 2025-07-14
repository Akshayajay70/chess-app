import { NextFunction, Request, Response } from "express";
import { AuthGoogleUserUseCase } from "../../application/use-cases/auth-google-user.uc";
import { UpdateNameUseCase } from "../../application/use-cases/update-name.uc";
import { config } from "../../config";
import { IGoogleAuthService } from "../../application/interfaces/google-auth.interface";
import { RefreshTokenUseCase } from "../../application/use-cases/refresh-token.uc";
import { TokenError } from "@/domain/errors/token.error";

export class AuthController {
    constructor(
        private readonly authGoogleUseCase: AuthGoogleUserUseCase,
        private readonly updateNameUseCase: UpdateNameUseCase,
        private readonly googleAuthService: IGoogleAuthService,
        private readonly refreshTokenUseCase: RefreshTokenUseCase
    ) { }

    initiateGoogleLogin(req: Request, res: Response): void {
        const authUrl = this.googleAuthService.getGoogleAuthRedirectUrl();
        res.redirect(authUrl);
    }

    async authenticateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { code } = req.query;
            if (!code || typeof code !== "string") {
                return res.status(400).json({ message: "Missing or invalid Google code" });
            }

            const result = await this.authGoogleUseCase.execute(code);

            if (result.newUser) {
                return res.status(200).json({ newUser: true, user: result.user });
            }

            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: config.nodeEnv === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.status(200).json({
                newUser: false,
                accessToken: result.accessToken,
                user: result.user
            });
        } catch (error) {
            next(error);
        }
    }

    async setName(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, name: newName } = req.body;

            const result = await this.updateNameUseCase.execute({ email, newName });

            if (!result.success) {
                return res.status(400).json({ message: "Failed to update name" });
            }

            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: config.nodeEnv === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.status(200).json({ accessToken: result.accessToken });
        } catch (error) {
            next(error);
        }
    }

    refreshToken = (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = req.headers.authorization?.split(" ")[1];
            const refreshToken = req.cookies.refreshToken;

            if(!accessToken) throw new TokenError('No access token provided');
            if(!refreshToken) throw new TokenError('No refresh token provided');

            const result = this.refreshTokenUseCase.execute({ accessToken, refreshToken });

            // Set new refresh token in HTTP-only cookie
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: config.nodeEnv === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            // Send access token in response
            res.status(200).json({ accessToken: result.accessToken });
        } catch (error) {
            next(error);
        }
    };

}
