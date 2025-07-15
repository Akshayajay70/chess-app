import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from '../../features/auth/redux/auth.slice';
import loggerMiddleware from "./middlewares";


export const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
    },
    middleware: (getDefaultMiddleware) => {
        const middlewares = getDefaultMiddleware({
            serializableCheck: false,
        });

        if (import.meta.env.VITE_ENV_MODE === 'development') {
            middlewares.push(loggerMiddleware);
        }

        return middlewares;
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;