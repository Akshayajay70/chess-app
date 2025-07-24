import type { Middleware } from "@reduxjs/toolkit";
import { connectSocket } from "../../../lib/socket/match-making";
import {
    matchFound,
    matchError,
    setSocketConnected,
    startFinding,
} from "../slices/match-making.slice";

const matchmakingSocketMiddleware: Middleware = (store) => {
    const socket = connectSocket();

    socket.on('connect', () => {
        store.dispatch(setSocketConnected(true));
    });

    socket.on('disconnect', () => {
        store.dispatch(setSocketConnected(false));
    });

    socket.on('match_found', (data: { matchRoomId: string }) => {
        store.dispatch(matchFound(data.matchRoomId));
    });

    socket.on('match_error', (error: string) => {
        store.dispatch(matchError(error));
    });

    return next => action => {
        if (startFinding.match(action)) {
            socket.connect();
            socket.emit('join_match', { 
                variant: store.getState().matchMaking.selectedVariant, 
                gameId: store.getState().userAuth.user.gameId,
                name: store.getState().userAuth.user.name,
                rating: store.getState().rating.variant.rating
            });
        }
        return next(action);
    };
};

export default matchmakingSocketMiddleware;
