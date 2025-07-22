import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUser {
    id: string;
    email: string;
    name?: string;
    picture?: string;
}

// Define the auth slice state interface
interface AuthState {
    mode: 'signup' | 'signin';
    user: IUser | null;
    token: string | null;
    loading: boolean;
    error: string | undefined;
    headingTitle: string;
    headingSubtitle: string;
}

// Helper function to get initial state based on mode
const getInitialState = (mode: 'signup' | 'signin'): AuthState => ({
    mode,
    user: null,
    token: localStorage.getItem('user_access_token'),
    loading: false,
    error: undefined,
    headingTitle: mode === 'signup' ? 'Create Your Account' : 'Welcome Back',
    headingSubtitle: mode === 'signup' 
        ? 'Sign up to start your journey'
        : 'Sign in to continue your adventure'
});

const initialState: AuthState = getInitialState('signup');

const authSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        setMode(state, action: PayloadAction<'signup' | 'signin'>) {
            const newState = getInitialState(action.payload);
            Object.assign(state, newState);
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            const token = action.payload;
            localStorage.setItem('user_access_token', token);
            state.token = token;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | undefined>) {
            state.error = action.payload;
        },
        logoutUser() {
            localStorage.removeItem('user_access_token');
            return getInitialState('signin');
        },
        invalidateToken(state) {
            localStorage.removeItem('user_access_token');
            state.token = null;
            state.user = null;
            return state;
        },
    }
});

export const { 
    setMode, 
    setUser, 
    setToken, 
    setLoading, 
    setError, 
    logoutUser, 
    invalidateToken 
} = authSlice.actions;

export default authSlice.reducer;
