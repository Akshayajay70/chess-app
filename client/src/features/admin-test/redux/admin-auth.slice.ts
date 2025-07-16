import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authUtils } from "../../../lib/admin-token";

// --- Types ---
interface AdminAuthState {
    isAuthenticated: boolean;
    adminAccessToken: string | null;
    loading: boolean;
    error?: string;
}

type Credentials = {
    username: string;
    password: string;
};

// --- Initial State ---
const token = authUtils.getToken();
const initialState: AdminAuthState = {
    isAuthenticated: !!token,
    adminAccessToken: token,
    loading: false,
    error: undefined
};

// --- Thunk ---
export const adminAuthThunk = createAsyncThunk<
    { accessToken: string },      // Returned data
    Credentials,                  // Thunk arg
    { rejectValue: string }       // Error type
>(
    "adminAuth",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:8000/admin/login", {
                username,
                password
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

// --- Slice ---
const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.adminAccessToken = null;
            state.loading = false;
            state.error = undefined;
            authUtils.removeToken();
        },
        clearError: (state) => {
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminAuthThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(adminAuthThunk.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.adminAccessToken = action.payload.accessToken;
                state.loading = false;
                state.error = undefined;
                authUtils.setToken(action.payload.accessToken);
            })
            .addCase(adminAuthThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error?.message || "Login failed";
                state.isAuthenticated = false;
                state.adminAccessToken = null;
            });
    },
});

// --- Exports ---
export const { logout, clearError } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
