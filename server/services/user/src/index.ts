import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { errorHandlingMiddleware } from './presentation/middlewares/error-handling';
import { connectDB } from './infrastructure/database/connection';

// --- Services & Use Cases ---
import { AuthGoogleUserUseCase } from "./application/use-cases/auth-google-user.uc";
import { UpdateNameUseCase } from "./application/use-cases/update-name.uc";
import { RefreshTokenUseCase } from "./application/use-cases/refresh-token.uc";
import { GetUserUseCase } from './application/use-cases/get-user.uc';
import { GoogleAuthService } from "./infrastructure/services/google-auth.service";
import { JwtService } from "./infrastructure/services/jwt-token.service";
import { UserRepository } from "./infrastructure/database/user.repository";
import { AuthController } from './presentation/controllers/auth.controller';
import { UserController } from './presentation/controllers/user.controller';

// --- Routes ---
import { createUserRoutes } from './presentation/routes/user.routes';
import { createAuthRoutes } from './presentation/routes/auth.routes';

// --- Setup Dependencies ---
const userRepo = new UserRepository();
const googleService = new GoogleAuthService();
const jwtService = new JwtService();

const getUserUC = new GetUserUseCase(userRepo);
const userController = new UserController(getUserUC);

const authGoogleUC = new AuthGoogleUserUseCase(googleService, userRepo, jwtService);
const updateNameUC = new UpdateNameUseCase(userRepo, jwtService);
const refreshTokenUC = new RefreshTokenUseCase(jwtService);

const authController = new AuthController(
    authGoogleUC,
    updateNameUC,
    googleService,
    refreshTokenUC
);

const app = express();
const { port: PORT } = config;

// --- Middleware ---
app.use(express.json());
app.use(cookieParser());

// --- Route Binding ---
app.use('/auth', createAuthRoutes(authController));
app.use('/user', createUserRoutes(userController));

// --- Error Handler ---
app.use(errorHandlingMiddleware);

// --- Start Server ---
async function start() {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}
start();