import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/redux/hooks';
import { clearError, clearSuccessMessage } from '../../../app/redux/slices/friends.slice';

export function Notification() {
    const dispatch = useAppDispatch();
    const { error, successMessage } = useAppSelector(state => state.friends);

    useEffect(() => {
        if (error || successMessage) {
            const timer = setTimeout(() => {
                if (error) dispatch(clearError());
                if (successMessage) dispatch(clearSuccessMessage());
            }, 5000); // Auto dismiss after 5 seconds

            return () => clearTimeout(timer);
        }
    }, [error, successMessage, dispatch]);

    if (!error && !successMessage) return null;

    return (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
            {error && (
                <div className="bg-red-600 text-white px-6 py-4 rounded-xl shadow-lg mb-3 animate-in slide-in-from-right-2 duration-300">
                    <div className="flex items-center gap-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 flex-shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                        <div>
                            <div className="font-semibold">Error</div>
                            <div className="text-sm opacity-90">{error}</div>
                        </div>
                        <button
                            onClick={() => dispatch(clearError())}
                            className="ml-auto text-white/70 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {successMessage && (
                <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg mb-3 animate-in slide-in-from-right-2 duration-300">
                    <div className="flex items-center gap-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 flex-shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22,4 12,14.01 9,11.01"></polyline>
                        </svg>
                        <div>
                            <div className="font-semibold">Success</div>
                            <div className="text-sm opacity-90">{successMessage}</div>
                        </div>
                        <button
                            onClick={() => dispatch(clearSuccessMessage())}
                            className="ml-auto text-white/70 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
} 