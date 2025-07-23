import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.ts";

export function createAuthRoutes(authController: AuthController): Router {
    const router = Router();

    // Step 1: Start Google OAuth flow
    router.get("/google", authController.initiateGoogleLogin.bind(authController));

    // Step 2: Handle Google OAuth callback
    router.get("/google/callback", authController.authenticateUser.bind(authController));

    // Set name for newly registered guest
    router.patch("/set-name", authController.setName.bind(authController));

    // Issue new access/refresh tokens
    router.post("/refresh-token", authController.refreshToken.bind(authController));

    return router;
}
