import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from './config/index';
import { connectDB } from './infrastructure/db/connection/connection';

import { createGameRoutes } from './presentation/routes/game.routes';
import { GameController } from './presentation/controllers/game.controller';
import { CreateGameUseCase } from './application/use-cases/create-game.uc';
import { GameRepo } from './infrastructure/db/repository/game.repo';
import { errorHandlingMiddleware } from './presentation/middlewares/error-handling';

const gameRepo = new GameRepo()
const createGameUseCase = new CreateGameUseCase(gameRepo)
const gameController = new GameController(createGameUseCase)

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

// --- Route Binding ---
app.use('/game', createGameRoutes(gameController));

// --- Error Handler ---
app.use(errorHandlingMiddleware);

io.on('connection', (socket) => {
    console.log(socket.id);
})

async function start() {
    await connectDB();
    server.listen(PORT, () => console.log(`🚀 Game service running at http://localhost:${PORT}`));
}

start();