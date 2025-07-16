import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from '../../features/auth/redux/auth.slice';
import loggerMiddleware from "./middlewares";
import userManReducer from "../../features/admin-test/redux/userMan.slice";
import adminAuthReducer from '../../features/admin-test/redux/admin-auth.slice'


export const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
        adminAuth: adminAuthReducer,
        adminUserMan: userManReducer
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