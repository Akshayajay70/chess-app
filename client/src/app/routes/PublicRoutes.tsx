import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import type { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { Spinner as AuthSpinner } from "../../shared/components/Spinner";
export function PublicRoutes() {
    const token = useAppSelector((state: RootState) => state.userAuth.token);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (token) {
            const timer = setTimeout(() => {
                setShouldRedirect(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [token]);

    if (token && !shouldRedirect) return <AuthSpinner />;

    if (token && shouldRedirect) return <Navigate to={'/user/home'} replace />;

    return <Outlet />;
}