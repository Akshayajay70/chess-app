import { createSlice } from "@reduxjs/toolkit";

export const variants = [
    'bullet(1+0)',
    'bullet(1+2)',
    'blitz(3+0)',
    'blitz(3+2)',
    'rapid(10+0)',
    'rapid(10+5)',
    'classic(60+30)',
    'classic(90+30)'
] as const;

export type VariantType = typeof variants[number]

interface MatchingState {
    status: 'idle' | 'finding' | 'matched' | 'error';
    selectedVariant: VariantType | null,
    error: string | null,
    matchRoomId: string | null,
    socketConnected: boolean
}

const initialState: MatchingState = {
    status: 'idle',
    selectedVariant: null,
    error: null,
    matchRoomId: null,
    socketConnected: false
}


const matchmakingSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        selectVariant(state, action) {
            state.selectedVariant = action.payload;
        },
        startFinding(state) {
            state.status = 'finding';
            state.error = null;
            state.matchRoomId = null;
        },
        setSocketConnected(state, action) {
            state.socketConnected = action.payload;
        },
        matchFound(state, action) {
            state.status = 'matched';
            state.matchRoomId = action.payload;
        },
        matchError(state, action) {
            state.status = 'error';
            state.error = action.payload;
        },
        resetMatchmaking(state) {
            Object.assign(state, initialState);
        },
    },
})

export const {
    selectVariant,
    startFinding,
    setSocketConnected,
    matchFound,
    matchError,
    resetMatchmaking,
} = matchmakingSlice.actions;

export default matchmakingSlice.reducer;