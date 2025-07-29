import { Socket } from 'socket.io';
import {
    IAddMove,
    IEndGame,
    IUndoMove
} from '../../application/ports/interfaces/use-case.interface.ts';

export class GameSocketController {
    constructor(
        private readonly addMove: IAddMove,
        private readonly endGame: IEndGame,
        private readonly undoMove: IUndoMove
    ) { }

    handleConnection(socket: Socket) {
        console.log(socket.id);

        socket.on('make_move', async (data, callback) => {
            console.log('make_move_data', data)
            try {
                const result = await this.addMove.execute(data);

                socket.to(data.matchRoomId).emit('opponent_move', result);
            } catch (error) {
                callback(
                    error instanceof Error
                        ? error.message
                        : 'Failed to make move'
                )
            }
        });

        socket.on('undo_move', async (data, callback) => {
            try {
                console.log('undo_move_data', data);
                const result = await this.undoMove.execute(data);
                callback(result ? true : false)
            } catch (error) {
                callback(
                    error instanceof Error
                        ? error.message
                        : 'Failed to undo move'
                )
            }
        })

        socket.on('end_game', async (data, callback) => {
            try {
                console.log('end_game_data', data)
                const result = await this.endGame.execute(data);
                callback(result);
            } catch (error) {
                callback(
                    error instanceof Error
                        ? error.message
                        : 'Failed to end game'
                );
            }
        });
    }
} 