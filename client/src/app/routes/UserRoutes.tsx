import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { GoogleAuthPage } from "../../features/auth/pages/GoogleAuthPage"
import { LandingPage } from "../../features/landing/pages/LandingPage"
import { PublicRoutes } from "./PublicRoutes"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { HomePage } from "../../features/home/HomePage"
import { AdminLoginPage } from "../../features/admin-test/pages/AuthPage"
import { UserManagementPage } from "../../features/admin-test/pages/UserManagementPage"

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
        element: <UserManagementPage />
    }
])

export default () => <RouterProvider router={router} />