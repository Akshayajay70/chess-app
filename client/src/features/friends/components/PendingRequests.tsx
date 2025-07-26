import { useAppDispatch } from "../../../app/redux/hooks";
import { acceptFriendRequest, declineFriendRequest } from "../../../app/redux/slices/friends.slice";
import type { FriendRequest } from "../../../app/redux/slices/friends.slice";

interface PendingRequestsProps {
    requests: FriendRequest[];
    loading: boolean;
}

export function PendingRequests({ requests, loading }: PendingRequestsProps) {
    const dispatch = useAppDispatch();

    const handleAcceptRequest = (senderId: string) => {
        dispatch(acceptFriendRequest({ senderId }));
    };

    const handleDeclineRequest = (senderId: string) => {
        dispatch(declineFriendRequest({ senderId }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-white text-xl">Loading requests...</div>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-white text-6xl mb-4">📨</div>
                <div className="text-white text-2xl font-semibold mb-2">No Pending Requests</div>
                <div className="text-slate-300 text-base">You're all caught up!</div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="text-white text-2xl font-semibold mb-6">Pending Requests</div>
            <div className="flex-1 overflow-y-auto space-y-4">
                {requests.map((request) => (
                    <div
                        key={request.senderId}
                        className="bg-[#3456e4] rounded-2xl p-4 flex items-center justify-between shadow-lg hover:bg-[#4666f6] transition-all duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-4 ring-orange-400/20">
                                {request.senderName.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <div className="text-white font-semibold text-lg">{request.senderName}</div>
                                <div className="text-slate-300 text-sm">Game ID: {request.senderId}</div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleAcceptRequest(request.senderId)}
                                className="px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleDeclineRequest(request.senderId)}
                                className="px-4 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 