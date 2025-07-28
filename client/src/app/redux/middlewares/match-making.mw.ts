import type { Middleware } from "@reduxjs/toolkit";
import { connectSocket } from "../../../lib/socket/match-making";
import {
    matchFound,
    matchError,
    setSocketConnected,
    startFinding,
    type VariantType,
} from "../slices/match-making.slice";
import {
    setGameState
} from "../slices/game.slice"

type MatchRoom = {
  matchRoomId: string;
  whitePlayer: {
    gameId: string;
    name: string;
    rating: number;
  };
  blackPlayer: {
    gameId: string;
    name: string;
    rating: number;
  };
  variant: VariantType;
};


const matchmakingSocketMiddleware: Middleware = (store) => {
    const socket = connectSocket();

    socket.on('connect', () => {
        store.dispatch(setSocketConnected(true));
    });

    socket.on('disconnect', () => {
        store.dispatch(setSocketConnected(false));
    });

    socket.on('match_found', (data: MatchRoom) => {
        localStorage.setItem('match_details', JSON.stringify(data));
        store.dispatch(setGameState({
            matchRoomId: data.matchRoomId,
            players: [data.whitePlayer, data.blackPlayer],
            variant: data.variant
        }))
        store.dispatch(matchFound(data.matchRoomId));
    });

    socket.on('match_error', (error: string) => {
        localStorage.removeItem('match_details');
        store.dispatch(matchError(error));
    });

    return next => action => {
        if (startFinding.match(action)) {
            socket.connect();
            const variant = store.getState().matchMaking.selectedVariant
            console.log('variant', variant)
            function parseVariant(variant: string) {
                const match = variant.match(/([a-zA-Z]+)\(([^)]+)\)/);
                if (!match) return variant;
                return match[1]
            }
            
            const variantType = parseVariant(variant);
            console.log('rating', store.getState().rating.ratings[variantType])
            socket.emit('join_match', {
                variant: store.getState().matchMaking.selectedVariant,
                gameId: store.getState().userAuth.user.gameId,
                name: store.getState().userAuth.user.name,
                rating: Number(store.getState().rating.ratings[variantType])
            });
        }
        return next(action);
    };
};

export default matchmakingSocketMiddleware;
