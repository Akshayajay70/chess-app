import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { GoogleAuthPage } from "../../features/auth/pages/GoogleAuthPage"
import { LandingPage } from "../../features/landing/pages/LandingPage"
import { PublicRoutes } from "./PublicRoutes"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { HomePage } from "../../features/home/HomePage"

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
    }
])

export default () => <RouterProvider router={router} />