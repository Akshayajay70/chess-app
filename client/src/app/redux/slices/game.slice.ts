import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Move {
  san: string;
  color: 'w' | 'b';
}

interface GameState {
  moves: Move[];
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
    },
  },
});

export const { addMove, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
