import { useAppDispatch } from "../../../app/redux/hooks";
import { removeFriend } from "../../../app/redux/slices/friends.slice";
import type { Friend } from "../../../app/redux/slices/friends.slice";

interface FriendsListProps {
    connections: Friend[];
    loading: boolean;
}

export function FriendsList({ connections, loading }: FriendsListProps) {
    const dispatch = useAppDispatch();

    const handleRemoveFriend = (friendId: string) => {
        dispatch(removeFriend({ otherUserId: friendId }));
    };

    const handlePlayWithFriend = (friendId: string) => {
        // TODO: Implement play with friend functionality
        console.log('Play with friend:', friendId);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-white text-xl">Loading friends...</div>
            </div>
        );
    }

    if (connections.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-white text-6xl mb-4">👥</div>
                <div className="text-white text-2xl font-semibold mb-2">No Friends Yet</div>
                <div className="text-slate-300 text-base">Add some friends to start playing together!</div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="text-white text-2xl font-semibold mb-6">Your Friends</div>
            <div className="flex-1 overflow-y-auto space-y-4">
                {connections.map((friend) => (
                    <div
                        key={friend.id}
                        className="bg-[#3456e4] rounded-2xl p-4 flex items-center justify-between shadow-lg hover:bg-[#4666f6] transition-all duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-4 ring-purple-400/20">
                                {friend.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <div className="text-white font-semibold text-lg">{friend.name}</div>
                                <div className="text-slate-300 text-sm">Status: {friend.status}</div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePlayWithFriend(friend.id)}
                                className="px-4 py-2 bg-[#25336a] text-white rounded-xl font-semibold hover:bg-[#2d3e7a] transition-all duration-300 hover:scale-105"
                            >
                                Play
                            </button>
                            <button
                                onClick={() => handleRemoveFriend(friend.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 