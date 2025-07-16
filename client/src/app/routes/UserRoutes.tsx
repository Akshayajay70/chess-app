import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { GoogleAuthPage } from "../../features/auth/pages/GoogleAuthPage"
import { LandingPage } from "../../features/landing/pages/LandingPage"
import { PublicRoutes } from "./PublicRoutes"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { HomePage } from "../../features/home/HomePage"
import { AdminLoginPage } from "../../features/admin-test/pages/AuthPage"
import { UserManagementPage } from "../../features/admin-test/pages/UserManagementPage"
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import type { RootState } from "../redux/store";

function AdminProtectedRoutes() {
    const isAuthenticated = useAppSelector((state: RootState) => state.adminAuth.isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to={'/admin/login'} replace />;
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicRoutes />,
        children: [
            { index: true, element: <LandingPage /> }
        ]
    },
    {
        path: '/user/home',
        element: <ProtectedRoutes />,
        children: [
            { index: true, element: <HomePage /> }
        ]
    },
    {
        path: '/auth',
        children: [
            {
                path: 'signup',
                element: <PublicRoutes />,
                children: [
                    { index: true, element: <GoogleAuthPage mode="signup" /> }
                ]
            },
            {
                path: 'login',
                element: <PublicRoutes />,
                children: [
                    { index: true, element: <GoogleAuthPage mode="signin" /> }
                ]
            },

        ]
    },
    {
        path: '/admin/login',
        element: <AdminLoginPage />
    },
    {
        path: '/admin/user',
        element: <AdminProtectedRoutes />, // protect admin route
        children: [
            { index: true, element: <UserManagementPage /> }
        ]
    }
])

export default () => <RouterProvider router={router} />