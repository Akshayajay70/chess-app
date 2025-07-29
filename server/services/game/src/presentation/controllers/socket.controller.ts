import { Socket } from 'socket.io';
import {
    IAddMove,
    IEndGame,
    IGetGameState,
    IGetMoves,
    IJoinMatch,
    IUndoMove
} from '../../application/ports/interfaces/use-case.interface.ts';

export class GameSocketController {
    private matchRoomIdMap;
    private socketIdMap;
    constructor(
        private readonly joinMatch: IJoinMatch,
        private readonly addMove: IAddMove,
        private readonly endGame: IEndGame,
        private readonly undoMove: IUndoMove,
        private readonly gameState: IGetGameState,
        private readonly getMoves: IGetMoves
    ) {
        this.matchRoomIdMap = new Map<string, Record<string, string>>();
        this.socketIdMap = new Map<string, { matchRoomId: string, gameId: string }>();
    }

    handleConnection(socket: Socket) {
        console.log(socket.id);

        socket.on('join_match', async (data, callback) => {
            console.log(data);
            try {
                const response = await this.joinMatch.execute(data.matchRoomId, data.gameId);
                if (!response.success) {
                    socket.to(data.matchRoomId).emit('opponent_connected', false);
                    return callback(response);
                }
                socket.join(data.matchRoomId);
                socket.to(data.matchRoomId).emit('opponent_connected', true);

                this.socketIdMap.set(socket.id, data);

                const current = this.matchRoomIdMap.get(data.matchRoomId) || {};
                this.matchRoomIdMap.set(data.matchRoomId, {
                    ...current,
                    [data.gameId]: socket.id
                });

                callback(response);

            } catch (error) {
                callback(
                    error instanceof Error
                        ? error.message
                        : 'Failed to join match'
                )
            }
        })

        socket.on('make_move', async (data, callback) => {
            console.log('make_move_data', data)
            try {
                await this.addMove.execute(data);
                socket.to(data.matchRoomId).emit('opponent_move', data);
            } catch (error) {
                callback(
                    error instanceof Error
                        ? error.message
                        : 'Failed to make move'
                )
            }
        });

        socket.on('get_moves', async (data, callback) => {
            try {
                const response = await this.getMoves.execute(data.matchRoomId);
                callback(response);
            } catch (error) {
                callback(
                    error instanceof Error
                        ? error.message
                        : 'Failed to get moves'
                )
            }
        })

        socket.on('undo_move', async (data, callback) => {
            console.log('undo_move_data', data);
            try {
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
            console.log('end_game_data', data)
            try {
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

        socket.on('disconnect', async (reason) => {
            console.log('disconnect_reason', reason);
            const data = this.socketIdMap.get(socket.id);
            if (!data) return;

            const { matchRoomId, gameId } = data;
            try {
                const gameState = await this.gameState.execute(matchRoomId);
                const result = gameState?.players[0].gameId === gameId ? '0-1' : '1-0';

                const timeout = setTimeout(async () => {
                    await this.endGame.execute({
                        matchRoomId,
                        endType: 'abandonment',
                        result
                    });
                    this.socketIdMap.delete(socket.id);
                    this.matchRoomIdMap.delete(matchRoomId);
                    clearInterval(interval);
                }, 30_000);

                const interval = setInterval(() => {
                    const currentSocket = this.matchRoomIdMap.get(matchRoomId)?.[gameId];
                    if (currentSocket && currentSocket !== socket.id) {
                        clearTimeout(timeout);
                        clearInterval(interval);
                    }
                }, 3000);
            } catch (error) {
                console.log(error instanceof Error ? error.message : 'Unknown error');
            }
        });

    }
} 