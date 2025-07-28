import type { Middleware } from "@reduxjs/toolkit";
import { connectSocket } from "../../../lib/socket/gaming";
import {
  setGameState,
  gameEnd,
  setOpponent,
  syncGameState,
  setTurn,
  setCurrentPlayer,
  type Player,
} from "../slices/game.slice";
import { matchFound, resetMatchmaking } from "../slices/match-making.slice";

interface SocketResponse {
  success: boolean;
  message?: string;
  error?: string;
}

interface GameStateResponse {
  success: boolean;
  state?: {
    matchRoomId: string;
    players: [Player, Player];
    variant: string;
    status: 'ongoing' | 'ended';
    moves: any[];
  };
  error?: string;
}

const gameSocketMiddleware: Middleware = (store) => {
  let socket = connectSocket();

  socket.on("connect", () => {
    // On connect or reconnect, re-join game and sync state
    const matchDetails = JSON.parse(localStorage.getItem("match_details") || "{}");
    if (matchDetails.matchRoomId) {
      socket.emit(
        "join_game",
        { matchRoomId: matchDetails.matchRoomId },
        (response: SocketResponse) => {
          if (response.success) {
            socket.emit(
              "get_game_state",
              { matchRoomId: matchDetails.matchRoomId },
              (stateResponse: GameStateResponse) => {
                if (stateResponse.success && stateResponse.state) {
                  store.dispatch(setGameState({
                    matchRoomId: matchDetails.matchRoomId,
                    players: stateResponse.state.players,
                    variant: stateResponse.state.variant,
                    status: stateResponse.state.status,
                    moves: stateResponse.state.moves || []
                  }));
                }
              }
            );
          }
        }
      );
    }
  });

  socket.on("opponent_move", (data) => {
    if (data.success && data.newState) {
      store.dispatch(syncGameState({
        moves: data.newState.moves,
        status: data.newState.status
      }));
      store.dispatch(setTurn(true)); // Now it's my turn
    }
  });

  socket.on("move_error", (err) => {
    // Show error to user (dispatch an error action or notification)
    console.error("Move error:", err);
  });

  socket.on("game_end", (data) => {
    store.dispatch(gameEnd(data));
    localStorage.removeItem("match_details");
    store.dispatch(resetMatchmaking());
  });

  socket.on("join_game_response", (response: SocketResponse) => {
    if (response.success) {
      console.log("Successfully joined game");
    }
  });

  return (next) => (action) => {
    if (matchFound.match(action)) {
      // Connect and join game
      socket.connect();
      const matchDetails = JSON.parse(localStorage.getItem("match_details") || "{}");
      const player = store.getState().userAuth.user;
      
      // Determine if current player is white or black
      const isWhite = matchDetails.whitePlayer?.gameId === player.gameId;
      store.dispatch(setTurn(isWhite)); // White goes first
      store.dispatch(setCurrentPlayer(player));
      
      if (isWhite) {
        store.dispatch(setOpponent(matchDetails.blackPlayer));
      } else {
        store.dispatch(setOpponent(matchDetails.whitePlayer));
      }

      socket.emit(
        "join_game",
        { matchRoomId: matchDetails.matchRoomId },
        (response: SocketResponse) => {
          if (response.success) {
            socket.emit(
              "get_game_state",
              { matchRoomId: matchDetails.matchRoomId },
              (stateResponse: GameStateResponse) => {
                if (stateResponse.success && stateResponse.state) {
                  store.dispatch(setGameState({
                    matchRoomId: matchDetails.matchRoomId,
                    players: stateResponse.state.players,
                    variant: stateResponse.state.variant,
                    status: stateResponse.state.status,
                    moves: stateResponse.state.moves || []
                  }));
                }
              }
            );
          }
        }
      );
    }

    // Handle move sending
    if (action && typeof action === 'object' && 'type' in action && action.type === "game/addMove") {
      const matchDetails = JSON.parse(localStorage.getItem("match_details") || "{}");
      const player = store.getState().userAuth.user;
      
      if (matchDetails.matchRoomId) {
        socket.emit("make_move", {
          matchRoomId: matchDetails.matchRoomId,
          move: (action as any).payload,
          player: player
        });
        store.dispatch(setTurn(false)); // Not my turn anymore
      }
    }

    return next(action);
  };
};

export default gameSocketMiddleware; 