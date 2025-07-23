import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from './config/index.ts';
import { errorHandlingMiddleware } from './presentation/middlewares/error-handling.ts';
import { connectDB } from './infrastructure/database/connection.ts';

// --- Services & Use Cases ---
import { AuthGoogleUserUseCase } from "./application/use-cases/auth-google-user.uc.ts";
import { UpdateNameUseCase } from "./application/use-cases/update-name.uc.ts";
import { RefreshTokenUseCase } from "./application/use-cases/refresh-token.uc.ts";
import { GetUserUseCase } from './application/use-cases/get-user.uc.ts';
import { GoogleAuthService } from "./infrastructure/services/google-auth.service.ts";
import { UpdateStatusUseCase } from './application/use-cases/update-status.uc.ts';
import { JwtService } from "./infrastructure/services/jwt-token.service.ts";
import { KafkaEventPublisher, EventUserStatusUpdatedListner } from './infrastructure/services/kafka/kafka-event-publisher.ts';
import { UserRepository } from "./infrastructure/database/user.repository.ts";
import { AuthController } from './presentation/controllers/auth.controller.ts';
import { UserController } from './presentation/controllers/user.controller.ts';

// --- Routes ---
import { createUserRoutes } from './presentation/routes/user.routes.ts';
import { createAuthRoutes } from './presentation/routes/auth.routes.ts';

// --- Setup Dependencies ---
const userRepo = new UserRepository();
const googleService = new GoogleAuthService();
const jwtService = new JwtService();
const publisher = new KafkaEventPublisher();
const listner = new EventUserStatusUpdatedListner();

const updateStatusUC = new UpdateStatusUseCase(userRepo, listner)
const getUserUC = new GetUserUseCase(userRepo);
const userController = new UserController(getUserUC);

const authGoogleUC = new AuthGoogleUserUseCase(googleService, userRepo, jwtService, publisher);
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

// --- Consumer ---
updateStatusUC.execute();

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