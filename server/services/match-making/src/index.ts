import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from './config/index.ts';

import { SocketController } from './presentation/socket.controller.ts';
import { HandleDisconnectUseCase } from './application/use-cases/handle-disconnect.uc.ts';
import { JoinMatchUseCase } from './application/use-cases/join-match.uc.ts';
import { MatchMakingRepo } from './infrastructure/repositories/match-making.ts';
import { InMemoryPlayerRepository } from './infrastructure/repositories/in-memory-player.ts';
import { CommunicationService } from './infrastructure/services/communication.service.ts';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})
const { port: PORT } = config;

const matchMakingRepo = new MatchMakingRepo()

const playerRepo = new InMemoryPlayerRepository()
const communicationService = new CommunicationService()
const handleConnection = new HandleDisconnectUseCase(matchMakingRepo, playerRepo);
const joinMatchUseCase = new JoinMatchUseCase(matchMakingRepo, playerRepo, communicationService)

const socketController = new SocketController(
    handleConnection,
    joinMatchUseCase,
    io
)



app.get('/', (req, res) => res.send('Hii from server'));

io.on('connection', (socket) => {
    console.log(socket.id);
    socketController.handleConnection(socket)
})

server.listen(PORT, () => console.log(`🚀 Match-making service running at http://localhost:${PORT}`)) 