import { useState } from "react";
import { useAppDispatch } from "../../../app/redux/hooks";
import { sendFriendRequest } from "../../../app/redux/slices/friends.slice";

export function SearchFriends() {
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        
        setIsSearching(true);
        // TODO: Implement actual search API call
        // For now, we'll simulate search results
        setTimeout(() => {
            setSearchResults([
                { id: "1", name: "John Doe", gameId: "john123" },
                { id: "2", name: "Jane Smith", gameId: "jane456" },
                { id: "3", name: "Bob Wilson", gameId: "bob789" },
            ].filter(user => 
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.gameId.toLowerCase().includes(searchQuery.toLowerCase())
            ));
            setIsSearching(false);
        }, 500);
    };

    const handleSendRequest = (userId: string, userName: string) => {
        dispatch(sendFriendRequest({ receiverId: userId, receiverName: userName }));
        // Clear search after sending request
        setSearchQuery("");
        setSearchResults([]);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 px-4 py-3 bg-[#25336a] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400"
                />
                <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="px-6 py-3 bg-[#3456e4] text-white rounded-xl font-semibold hover:bg-[#4666f6] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSearching ? "Searching..." : "Search"}
                </button>
            </div>

            {searchResults.length > 0 && (
                <div className="space-y-3">
                    <div className="text-white text-lg font-semibold">Search Results</div>
                    {searchResults.map((user) => (
                        <div
                            key={user.id}
                            className="bg-[#25336a] rounded-xl p-4 flex items-center justify-between shadow-lg"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-blue-400/20">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-white font-semibold">{user.name}</div>
                                    <div className="text-slate-300 text-sm">ID: {user.gameId}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleSendRequest(user.gameId, user.name)}
                                className="px-4 py-2 bg-[#3456e4] text-white rounded-lg font-semibold hover:bg-[#4666f6] transition-all duration-300 hover:scale-105"
                            >
                                Add Friend
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {searchQuery && searchResults.length === 0 && !isSearching && (
                <div className="text-center py-8">
                    <div className="text-slate-300 text-lg">No users found</div>
                    <div className="text-slate-400 text-sm">Try searching with a different name or ID</div>
                </div>
            )}

            {!searchQuery && searchResults.length === 0 && (
                <div className="text-center py-8">
                    <div className="text-slate-300 text-lg">Search for Friends</div>
                    <div className="text-slate-400 text-sm">Enter a name or user ID to find players</div>
                </div>
            )}
        </div>
    );
} 