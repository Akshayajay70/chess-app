import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import type { RootState } from "../redux/store";

export function ProtectedRoutes() {
    const token = useAppSelector((state: RootState) => state.userAuth.token);

    return token ? <Outlet /> : <Navigate to={'/auth/login'} replace />
}