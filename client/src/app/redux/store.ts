import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from './slices/auth.slice';
import loggerMiddleware from "./middlewares/logger.mw";
import userManReducer from "./slices/user-man.slice";
import adminAuthReducer from './slices/admin-auth.slice';
import matchMakingReducer from './slices/match-making.slice';
import ratingReducer from './slices/rating.slice';
import matchmakingMiddleware from "./middlewares/match-making.mw";

export const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
        adminAuth: adminAuthReducer,
        adminUserMan: userManReducer,
        matchMaking: matchMakingReducer,
        rating: ratingReducer
    },
    middleware: (getDefaultMiddleware) => {
        const middlewares = getDefaultMiddleware({
            serializableCheck: false,
        }).concat(matchmakingMiddleware);

        if (import.meta.env.VITE_ENV_MODE === 'development') {
            middlewares.push(loggerMiddleware);
        }

        return middlewares;
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;