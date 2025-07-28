import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Move {
  san: string;
  color: 'w' | 'b';
}

export interface Player {
  gameId: string;
  name: string;
  rating: number;
}

export interface TimerState {
  whiteTime: number;
  blackTime: number;
  activeColor: 'w' | 'b';
}

interface GameState {
  matchRoomId?: string;
  moves: Move[];
  players?: [Player, Player];
  opponent?: Player;
  variant?: string;
  status?: 'ongoing' | 'ended';
  timers?: TimerState;
  isMyTurn?: boolean;
  currentPlayer?: Player;
}

const initialState: GameState = {
  moves: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addMove(state, action: PayloadAction<Move>) {
      state.moves.push(action.payload);
    },
    resetGame(state) {
      state.moves = [];
      state.matchRoomId = undefined;
      state.players = undefined;
      state.opponent = undefined;
      state.variant = undefined;
      state.status = undefined;
      state.timers = undefined;
      state.isMyTurn = undefined;
      state.currentPlayer = undefined;
    },
    setGameState(state, action: PayloadAction<Partial<GameState>>) {
      Object.assign(state, action.payload);
    },
    gameEnd(state, action: PayloadAction<any>) {
      state.status = 'ended';
      // Optionally store result/endType from action.payload
    },
    updateTimer(state, action: PayloadAction<TimerState>) {
      state.timers = action.payload;
    },
    setOpponent(state, action: PayloadAction<Player>) {
      state.opponent = action.payload;
    },
    setCurrentPlayer(state, action: PayloadAction<Player>) {
      state.currentPlayer = action.payload;
    },
    setTurn(state, action: PayloadAction<boolean>) {
      state.isMyTurn = action.payload;
    },
    syncGameState(state, action: PayloadAction<{moves: Move[], status: string}>) {
      state.moves = action.payload.moves;
      state.status = action.payload.status as 'ongoing' | 'ended';
    },
  },
});

export const { 
  addMove, 
  resetGame, 
  setGameState, 
  gameEnd, 
  updateTimer, 
  setOpponent, 
  setCurrentPlayer, 
  setTurn,
  syncGameState 
} = gameSlice.actions;
export default gameSlice.reducer;
