import { Socket } from 'socket.io';
import { IMoveGame, IEndGame, IGetGameState, IJoinGame } from '../../application/ports/interfaces/use-case.interface.ts';

export class GameSocketController {
    constructor(
        private readonly moveGame: IMoveGame,
        private readonly endGame: IEndGame,
        private readonly getGameState: IGetGameState,
        private readonly joinGame: IJoinGame
    ) { }

    handleConnection(socket: Socket) {
        console.log(socket.id);

        // Join a game room using the joinGame use-case
        socket.on('join_game', async (data, callback) => {
            try {
                const result = await this.joinGame.execute(data);
                if (result.success) {
                    socket.join(data.matchRoomId);
                    console.log(`Socket ${socket.id} joined room ${data.matchRoomId}`);
                    callback({ success: true, message: 'Joined game successfully.' });
                }
            } catch (error) {
                callback({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
            }
        });

        // Make move and broadcast to opponent
        socket.on('make_move', async (data) => {
            try {
                console.log('data', data)
                const result = await this.moveGame.execute(data);
                // Broadcast the move to the opponent (everyone else in the room)
                socket.to(data.matchRoomId).emit('opponent_move', result);
            } catch (err) {
                socket.emit('move_error', { error: err instanceof Error ? err.message : 'Unknown error' });
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
    }
} 