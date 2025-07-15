import { BackgroundIcons } from "../../../components/BackgroundIcons";
import { FloatingIndicators } from "../../../components/FloatingIndicators";
import ChessIcons from "../../../components/ChessIcons";
import HeadingText from "../components/HeadingText";
import GoogleButton from "../components/GoogleButton";
import { TermsNotice } from "../components/TermNotice";
import { useAppSelector, useAppDispatch } from "../../../app/redux/hooks";
import { setLoading, setMode, setToken, setError, setUser } from "../redux/auth.slice";
import { useEffect, useState, useRef } from "react";
import type { RootState } from "../../../app/redux/store";
import { Spinner as AuthSpinner } from "../../../components/Spinner";

export interface GooglePageProps {
    mode: 'signup' | 'signin'
}

export function GoogleAuthPage({ mode }: GooglePageProps) {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector((state: RootState) => state.userAuth.loading)
    const error = useAppSelector((state: RootState) => state.userAuth.error)
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [authSuccess, setAuthSuccess] = useState(false)
    const popupRef = useRef<Window | null>(null)
    const popupCheckInterval = useRef<number | null>(null)

    useEffect(() => {
        dispatch(setMode(mode));
        dispatch(setError(undefined));
    }, [mode, dispatch]);

    const handleGoogleAuth = () => {
        setIsAuthenticating(true)
        setAuthSuccess(false)
        dispatch(setLoading(true))
        dispatch(setError(undefined)) // Clear any previous errors

        const googleAuthURL = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
        popupRef.current = window.open(
            googleAuthURL,
            "googleAuthPopUp",
            "width=500,height=600"
        );

        // Start checking if popup is closed
        if (popupRef.current) {
            popupCheckInterval.current = setInterval(() => {
                if (popupRef.current?.closed) {
                    clearInterval(popupCheckInterval.current!);
                    popupRef.current = null;

                    // If authentication was successful, show spinner for 3 more seconds
                    if (authSuccess) {
                        setTimeout(() => {
                            dispatch(setLoading(false))
                            setIsAuthenticating(false)
                            setAuthSuccess(false)
                        }, 2000);
                    } else {
                        // If no success, show error and stop loading
                        dispatch(setError("Authentication was cancelled or failed. Please try again."))
                        dispatch(setLoading(false))
                        setIsAuthenticating(false)
                    }
                }
            }, 500);
        }
    };

    useEffect(() => {
        const receiveMessage = (event: MessageEvent) => {
            const origin = import.meta.env.VITE_BACKEND_URL;

            // validate origin
            if (!event.origin.includes(origin)) {
                return;
            }

            let { type, accessToken, user } = event.data || {};

            user = JSON.parse(user)

            if (type === "AUTH_SUCCESS" && accessToken) {
                setAuthSuccess(true)
                dispatch(setToken(accessToken))
                dispatch(setUser(user))
                dispatch(setError(undefined))

            } else {
                dispatch(setError("Authentication failed. Please try again."))
                dispatch(setLoading(false))
                setIsAuthenticating(false)
                setAuthSuccess(false)
            }
        };

        window.addEventListener("message", receiveMessage);
        return () => window.removeEventListener("message", receiveMessage);
    }, [dispatch]);

    // Cleanup interval on component unmount
    useEffect(() => {
        return () => {
            if (popupCheckInterval.current) {
                clearInterval(popupCheckInterval.current);
            }
        };
    }, []);

    // Show spinner when either loading from Redux or during authentication
    const shouldShowSpinner = isLoading || isAuthenticating;

    return (
        shouldShowSpinner
            ? <AuthSpinner />
            : <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4 relative">
                <BackgroundIcons />
                <div className="relative bg-slate-800/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-md w-full shadow-2xl border border-slate-700/50">
                    <HeadingText />

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-red-400 text-sm text-center">{error}</p>
                        </div>
                    )}

                    <GoogleButton handleClick={handleGoogleAuth} />
                    <TermsNotice />
                    <ChessIcons />
                </div>
                <FloatingIndicators />
            </div>
    );
}