export function GameSpinner() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col justify-center items-center p-4">
            <div className="relative">
                {/* Main spinner */}
                <div className="w-16 h-16 border-4 border-slate-600 border-t-game-purple rounded-full animate-spin shadow-lg" />

                {/* Inner pulse effect */}
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-game-purple/30 rounded-full animate-ping" />

                {/* Outer glow */}
                <div className="absolute -inset-2 w-20 h-20 bg-game-purple/20 rounded-full blur-sm animate-pulse" />
            </div>

            {/* Loading text */}
            <div className="mt-8 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Finding Opponent</h3>
                <p className="text-slate-400 text-sm">Please wait while we while we find an opponent</p>
            </div>

            {/* Dots animation */}
            <div className="flex space-x-1 mt-4">
                <div className="w-2 h-2 bg-game-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-game-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-game-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
        </div>
    );
}
