import { Server, Socket } from 'socket.io';
import { IMoveGame, IEndGame, IGetGameState } from '../../application/ports/interfaces/use-case.interface.ts';

export class GameSocketController {
    constructor(
        private readonly moveGame: IMoveGame,
        private readonly endGame: IEndGame,
        private readonly getGameState: IGetGameState
    ) { }

    registerHandlers(io: Server) {
        io.on('connection', (socket: Socket) => {
            socket.on('make_move', async (data, callback) => {
                try {
                    const result = await this.moveGame.execute(data);
                    callback(result);
                } catch (err) {
                    callback({ success: false, error: err instanceof Error ? err.message : 'Unknown error' });
                }
            });

            socket.on('end_game', async (data, callback) => {
                try {
                    const result = await this.endGame.execute(data);
                    callback(result);
                } catch (err) {
                    callback({ success: false, error: err instanceof Error ? err.message : 'Unknown error' });
                }
            });

            socket.on('get_game_state', async (data, callback) => {
                try {
                    const result = await this.getGameState.execute(data);
                    callback({ success: true, state: result });
                } catch (err) {
                    callback({ success: false, error: err instanceof Error ? err.message : 'Unknown error' });
                }
            });
        });
    }
} 