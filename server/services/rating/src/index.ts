import express from 'express';
import { config } from './config/index.ts';
import { connectDB } from './infrastructure/db/connection/connection.ts';
import { errorHandlingMiddleware } from './presentation/middlewares/error-handling.ts';

// --- Services & Use Cases ---
import { RatingRepository } from './infrastructure/db/repositories/rating.repo.ts';
import { KafkaUserCreatedListener } from './infrastructure/services/kafka.service.ts';
import { GetRatingUseCase } from './application/use-cases/get-rating.uc.ts';
import { RatingController } from './presentation/controllers/rating.controller.ts';
import { CreateUserRatingUseCase } from './application/use-cases/create-rating.uc.ts';
import { createRatingRoutes } from './presentation/routes/rating.routes.ts';

const { port: PORT } = config;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

// --- Setup Dependencies ---
const ratingRepo = new RatingRepository();
const kafkaListener = new KafkaUserCreatedListener();

const getUserRating = new GetRatingUseCase(ratingRepo);
const createUser = new CreateUserRatingUseCase(ratingRepo, kafkaListener)

const ratingController = new RatingController(
    getUserRating
)

createUser.execute();

// --- Route Binding ---
app.use('/rating', createRatingRoutes(ratingController));

// --- Error Handler ---
app.use(errorHandlingMiddleware)


async function start() {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Match-making service running at http://localhost:${PORT}`));
}

start()