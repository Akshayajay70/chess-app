import { useEffect, useState } from "react";
import { SideBar } from "../../../shared/components/Sidebar";
import { FriendsList } from "../components/FriendsList";
import { PendingRequests } from "../components/PendingRequests";
import { AddFriendButton } from "../components/AddFriendButton";
import { Notification } from "../components/Notification";
import { useAppDispatch, useAppSelector } from "../../../app/redux/hooks";
import { fetchConnections, fetchPendingRequests } from "../../../app/redux/slices/friends.slice";

export function FriendsPage() {
    const dispatch = useAppDispatch();
    const { connections, pendingRequests, loading, successMessage } = useAppSelector(state => state.friends);
    const [activeTab, setActiveTab] = useState<'friends' | 'requests'>('friends');
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(fetchConnections({}));
        dispatch(fetchPendingRequests());
    }, [dispatch]);

    // Handle automatic refresh after successful operations
    useEffect(() => {
        if (successMessage === 'Friend request accepted!') {
            dispatch(fetchConnections({}));
        }
    }, [successMessage, dispatch]);

    const filteredConnections = (connections || []).filter(friend =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Notification />
            <div className="h-screen bg-gradient-to-br from-slate-900 to-slate-800 grid grid-cols-12 gap-4 overflow-hidden">
            {/* Sidebar */}
            <div className="col-span-2 h-full">
                <SideBar />
            </div>

            <div className="col-span-10 h-screen grid grid-cols-12">
                {/* Main section left */}
                <div className="col-span-8 grid grid-rows-11 gap-4 p-5 h-screen mt-1">
                    {/* Tab Navigation */}
                    <div className="row-span-1 flex gap-4 justify-between">
                        <div className="flex gap-4">
                            <button
                                onClick={() => setActiveTab('friends')}
                                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${activeTab === 'friends'
                                        ? 'bg-[#3456e4] text-white shadow-lg'
                                        : 'bg-[#39398c] text-slate-300 hover:text-white hover:bg-[#4040a0]'
                                    }`}
                            >
                                Friends ({(connections || []).length})
                            </button>
                            <button
                                onClick={() => setActiveTab('requests')}
                                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${activeTab === 'requests'
                                        ? 'bg-[#3456e4] text-white shadow-lg'
                                        : 'bg-[#39398c] text-slate-300 hover:text-white hover:bg-[#4040a0]'
                                    }`}
                            >
                                Requests ({(pendingRequests || []).length})
                            </button>
                        </div>
                        <AddFriendButton />
                    </div>

                    {/* Content Area */}
                    <div className="row-span-10 bg-[#39398c] rounded-3xl p-6 shadow-lg overflow-hidden">
                        {activeTab === 'friends' ? (
                            <div className="h-full flex flex-col">
                                {/* Search Bar for Friends */}
                                <div className="mb-6">
                                    <div className="flex gap-3 items-center">
                                        <input
                                            type="text"
                                            placeholder="Search friends..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="flex-1 px-4 py-3 bg-[#25336a] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400"
                                        />

                                    </div>
                                </div>

                                {/* Friends List */}
                                <FriendsList connections={filteredConnections} loading={loading} />
                            </div>
                        ) : (
                            <PendingRequests requests={pendingRequests} loading={loading} />
                        )}
                    </div>
                </div>

                {/* Right Panel - Empty space for future use */}
                <div className="col-span-4 flex flex-col p-3 mb-2">
                    <div className="bg-[#39398c] rounded-3xl p-8 shadow-lg flex-1 flex flex-col">
                        <div className="text-white text-2xl font-semibold mb-6">Quick Actions</div>
                        <div className="text-slate-300 text-base">
                            More features coming soon...
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
} 