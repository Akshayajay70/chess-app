import express, { Request, Response, NextFunction, Router } from "express";
import { CreateFriendReqUseCase } from "./application/use-cases/create-friend-req.uc.ts";
import { FriendsRepo } from "./infrastructure/mongo-friends.repo.ts";
import { FriendsController } from "./presentation/controllers/friends.controller.ts";
import { createFriendsRoute } from "./presentation/routes/friends.route.ts";
import { connectToDatabase } from "./infrastructure/connection.db.ts";
import { CacheFriendHelper } from "./infrastructure/redis/helper/cache-friend.helper.ts";
import { RedisCacheService } from "./infrastructure/redis/redis-cache.service.ts";
import { GetConnectionsUseCase } from "./application/use-cases/get-connections.uc.ts";
import { GetFriendsHelper } from "./infrastructure/redis/helper/cache-get-friends.helper.ts";
import { RemoveFriendUseCase } from "./application/use-cases/remove-friend.uc.ts";
import { UpdateFriendUseCase } from "./application/use-cases/update-friend.uc.ts";
import { errorHandlingMiddleware } from "./presentation/middlewares/error-handling.ts";
import { config } from "./config/index.ts";
import { GetPendingRequestsUseCase } from "./application/use-cases/get-request.uc.ts";
import { UpdateRequestUseCase } from "./application/use-cases/update-pending-req.uc.ts";
import { CommunicationService } from "./infrastructure/axios/communication.service.ts";

const friendsRepo = new FriendsRepo();
const redisCacheService = new RedisCacheService();
const cacheFriendHelper = new CacheFriendHelper(redisCacheService);
const getFriendHelper = new GetFriendsHelper(redisCacheService);
const communicationService = new CommunicationService()

const createFriendReqUC = new CreateFriendReqUseCase(
    friendsRepo,
    communicationService
);

const getPendingReqUC = new GetPendingRequestsUseCase(
    friendsRepo
)

const updateRequestUC = new UpdateRequestUseCase(
    friendsRepo
)

const getConnectionsUC = new GetConnectionsUseCase(
    friendsRepo,
    getFriendHelper
)

const removeFriendUC = new RemoveFriendUseCase(
    friendsRepo,
    cacheFriendHelper,
    getFriendHelper
)

const updateFriendUC = new UpdateFriendUseCase(
    friendsRepo,
    cacheFriendHelper,
    getFriendHelper
)

const friendsController = new FriendsController(
    createFriendReqUC,
    getPendingReqUC,
    updateRequestUC,
    getConnectionsUC,
    removeFriendUC,
    updateFriendUC
)
const friendsRouter = Router();

friendsRouter.use(createFriendsRoute(friendsController));

const app = express();
const { port: PORT } = config

app.use(express.json());
app.use(express.urlencoded());

app.use("/friends", friendsRouter);

// --- Error Handling Middleware ---
interface AppError extends Error {
    statusCode?: number;
    status?: string;
    isOperational?: boolean;
}

// Not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`) as AppError;
    error.statusCode = 404;
    next(error);
});

// Global error handler
app.use(errorHandlingMiddleware);

async function start() {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Friend service running on port ${PORT}`);
    })
}

start()