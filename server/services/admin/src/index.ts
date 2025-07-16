import express from 'express';
import { config } from './config/index';
import { connectDB } from './infrastructure/database/connection';
import { errorHandlingMiddleware } from './presentation/middlewares/error-handling';

// --- Services & Use Cases ---
import { AdminRepository } from "./infrastructure/database/admin.repo";
import { KafkaUserCreatedListener } from "./infrastructure/services/kafka.service";
import { LoginUseCase } from "./application/use-cases/login.uc";
import { SearchUsersUseCase } from "./application/use-cases/search-users.uc";
import { UpdateStatusUseCase } from "./application/use-cases/update-status.uc";
import { SaveUserUseCase } from "./application/use-cases/save-user.uc";
import { AdminController } from "./presentation/controllers/admin.controller";
import { createAdminRoutes } from "./presentation/routes/admin.routes";
import { JwtService } from "./infrastructure/services/jwt.service";

const { port: PORT } = config;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

// --- Setup Dependencies ---
const adminRepo = new AdminRepository();
const kafkaListener = new KafkaUserCreatedListener();

const jwtService = new JwtService();
const loginUC = new LoginUseCase(jwtService);
const searchUsersUC = new SearchUsersUseCase(adminRepo);
const updateStatusUC = new UpdateStatusUseCase(adminRepo);
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