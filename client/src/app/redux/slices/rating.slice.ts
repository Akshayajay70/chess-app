import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authUtils } from "../../../lib/user-token";

const variants = [
    'bullet',
    'blitz',
    'rapid',
    'classic'
] as const;

type VariantType = typeof variants[number];

interface IRatingState {
    ratings: Record<VariantType, number> | null,
    loading: boolean,
    error: string | null
}

interface IRatingResponse {
    data: {
        gameId: string,
        name: string,
        ratings: Record<VariantType, number>
    }
}

const initialState: IRatingState = {
    ratings: {
        bullet: 100,
        blitz: 100,
        rapid: 100,
        classic: 100
    },
    loading: false,
    error: null
}


export const fetchRating = createAsyncThunk(
    "rating/fetchRating",
    async (_, thunkAPI) => {
        try {
            const token = authUtils.getToken()
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/rating/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.ratings)
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err instanceof Error ? err.message : "Failed to fetch rating");
        }
    }
);


const ratingSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRating.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(fetchRating.fulfilled, (state, action: PayloadAction<IRatingResponse>) => {
                state.loading = false,
                    state.ratings = action.payload.data.ratings
            })
            .addCase(fetchRating.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload as string
            })
    }
})

export default ratingSlice.reducer;