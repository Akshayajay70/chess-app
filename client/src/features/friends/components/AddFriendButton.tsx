import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/redux/hooks";
import { sendFriendRequest } from "../../../app/redux/slices/friends.slice";

export function AddFriendButton() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.userAuth.user);
    const [isExpanded, setIsExpanded] = useState(false);
    const [gameId, setGameId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAddFriend = async () => {
        if (!gameId.trim()) return;
        
        setIsLoading(true);
        try {
            if (!user) throw new Error("User not authenticated");
            await dispatch(sendFriendRequest({ 
                receiverId: gameId.trim()
            })).unwrap();
            
            setGameId("");
            setIsExpanded(false);
        } catch (error: any) {
            console.error("Failed to send friend request:", error);
            // Error will be handled by the notification component
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddFriend();
        } else if (e.key === 'Escape') {
            setIsExpanded(false);
            setGameId("");
        }
    };

    return (
        <div className="relative">
            {!isExpanded ? (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="px-6 py-3 bg-[#3456e4] text-white rounded-xl font-semibold hover:bg-[#4666f6] transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                    Add Friend
                </button>
            ) : (
                <div className="flex gap-2 items-center animate-in slide-in-from-right-2 duration-300">
                    <input
                        type="text"
                        placeholder="Enter Game ID..."
                        value={gameId}
                        onChange={(e) => setGameId(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onBlur={() => {
                            if (!gameId.trim()) {
                                setIsExpanded(false);
                            }
                        }}
                        className="px-4 py-3 bg-[#25336a] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400 w-48"
                        autoFocus
                    />
                    <button
                        onClick={handleAddFriend}
                        disabled={isLoading || !gameId.trim()}
                        className="px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Add"
                        )}
                    </button>
                    <button
                        onClick={() => {
                            setIsExpanded(false);
                            setGameId("");
                        }}
                        className="px-3 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
} 