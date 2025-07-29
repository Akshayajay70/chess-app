import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from './config/index.ts';

import { CreateGameUseCase } from './application/use-cases/create-game.uc.ts';
import { AddMoveUseCase } from './application/use-cases/add-move.uc.ts'
import { EndGameUseCase } from './application/use-cases/end-game.uc.ts';
import { GetGameStateUseCase } from './application/use-cases/get-game-state.uc.ts';
import { UndoMoveUseCase } from './application/use-cases/undo-move.uc.ts';

import { connectDB } from './infrastructure/db/connection/connection.ts';
import { GameStateCacheRedis } from './infrastructure/service/game-state-cache.redis.ts';
import { GameRepo } from './infrastructure/db/repository/game.repo.ts';

import { errorHandlingMiddleware } from './presentation/middlewares/error-handling.ts';
import { GameController } from './presentation/controllers/game.controller.ts';
import { GameSocketController } from './presentation/controllers/socket.controller.ts';
import { createGameRoutes } from './presentation/routes/game.routes.ts';

const app = express();
const server = createServer(app);
const { PORT } = config;

// repos
const gameRepo = new GameRepo();
// redis-cache
const cache = new GameStateCacheRedis();

// --- use cases ---
const createGameUseCase = new CreateGameUseCase(gameRepo);
const addMove = new AddMoveUseCase(cache);
const endGame = new EndGameUseCase(cache, gameRepo);
const getGameState = new GetGameStateUseCase(gameRepo);
const undoMove = new UndoMoveUseCase(cache);

// controllers
const gameSocketController = new GameSocketController(
    addMove,
    endGame,
    undoMove
);

const gameController = new GameController(
    createGameUseCase,
    getGameState
);

const io = new Server(server, {
    cors: {
        origin: "*"
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
    try {
        await connectDB();
        server.listen(PORT, () => console.log(`🚀 Game service running at http://localhost:${PORT}`));
    } catch (error) {
        console.error(
            'Server starting failed',
            error instanceof Error
                ? error.message
                : 'Failed to start server'
        )
    }
}

start();