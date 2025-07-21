import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from './config/index';

const app = express();
const server = createServer(app);
const { port: PORT } = config;

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log(socket.id);
})

server.listen(PORT, () => console.log(`🚀 Game service running at http://localhost:${PORT}`));