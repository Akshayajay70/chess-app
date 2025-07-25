import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from './config/index.ts';
import { connectDB } from './infrastructure/db/connection/connection.ts';

import { createGameRoutes } from './presentation/routes/game.routes.ts';
import { GameController } from './presentation/controllers/game.controller.ts';
import { CreateGameUseCase } from './application/use-cases/create-game.uc.ts';
import { GameRepo } from './infrastructure/db/repository/game.repo.ts';
import { errorHandlingMiddleware } from './presentation/middlewares/error-handling.ts';
import { MoveGameUseCase } from './application/use-cases/move-game.uc.ts';
import { EndGameUseCase } from './application/use-cases/end-game.uc.ts';
import { GetGameStateUseCase } from './application/use-cases/get-game-state.uc.ts';
import { GameStateCacheRedis } from './infrastructure/service/game-state-cache.redis.ts';
import { GameSocketController } from './presentation/controllers/socket.controller.ts';
import { JoinGameUseCase } from './application/use-cases/join-game.uc.ts';

const gameRepo = new GameRepo();
const cache = new GameStateCacheRedis();
const createGameUseCase = new CreateGameUseCase(gameRepo, cache);
const gameController = new GameController(createGameUseCase);
const moveGame = new MoveGameUseCase(cache);
const endGame = new EndGameUseCase(cache, gameRepo);
const getGameState = new GetGameStateUseCase(cache);
const joinGame = new JoinGameUseCase(cache, gameRepo);
const gameSocketController = new GameSocketController(moveGame, endGame, getGameState, joinGame);

const app = express();
const server = createServer(app);
const { port: PORT } = config;

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded());

// --- Route Binding ---
app.use('/game', createGameRoutes(gameController));

// --- Error Handler ---
app.use(errorHandlingMiddleware);

io.on('connection', (socket) => {
    gameSocketController.handleConnection(socket);
});

async function start() {
    await connectDB();
    server.listen(PORT, () => console.log(`🚀 Game service running at http://localhost:${PORT}`));
}

start();