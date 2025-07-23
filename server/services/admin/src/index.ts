import express from 'express';
import { config } from './config/index.ts';
import { connectDB } from './infrastructure/database/connection.ts';
import { errorHandlingMiddleware } from './presentation/middlewares/error-handling.ts';

// --- Services & Use Cases ---
import { AdminRepository } from "./infrastructure/database/admin.repo.ts";
import { KafkaUserCreatedListener } from "./infrastructure/services/kafka.service.ts";
import { LoginUseCase } from "./application/use-cases/login.uc.ts";
import { SearchUsersUseCase } from "./application/use-cases/search-users.uc.ts";
import { UpdateStatusUseCase } from "./application/use-cases/update-status.uc.ts";
import { SaveUserUseCase } from "./application/use-cases/save-user.uc.ts";
import { AdminController } from "./presentation/controllers/admin.controller.ts";
import { createAdminRoutes } from "./presentation/routes/admin.routes.ts";
import { JwtService } from "./infrastructure/services/jwt.service.ts";
import { KafkaUserStatusUpdate } from './infrastructure/services/kafka.service.ts';

const { port: PORT } = config;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

// --- Setup Dependencies ---
const adminRepo = new AdminRepository();
const kafkaListener = new KafkaUserCreatedListener();
const publisher = new KafkaUserStatusUpdate()

const jwtService = new JwtService();
const loginUC = new LoginUseCase(jwtService);
const searchUsersUC = new SearchUsersUseCase(adminRepo);
const updateStatusUC = new UpdateStatusUseCase(adminRepo, publisher);
const saveUserUC = new SaveUserUseCase(adminRepo, kafkaListener);

const adminController = new AdminController(
    loginUC,
    searchUsersUC,
    updateStatusUC
);
saveUserUC.execute()

// --- Route Binding ---
app.use('/admin', createAdminRoutes(adminController));

// --- Error Handler ---
app.use(errorHandlingMiddleware);

async function startDB() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`)
    });
}

startDB();