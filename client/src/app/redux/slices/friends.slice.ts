import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { store, type RootState } from '../store';
import { authUtils } from '../../../lib/user-token';

// Types
export interface Friend {
    id: string;
    name: string;
    status: string;
}
export interface FriendRequest {
    senderId: string;
    receiverId: string;
    senderName: string;
    receiverName: string;
    status: string;
}

interface FriendsState {
    connections: Friend[];
    pendingRequests: FriendRequest[];
    loading: boolean;
    error: string | null;
}

const initialState: FriendsState = {
    connections: [],
    pendingRequests: [],
    loading: false,
    error: null,
};

// Async thunks
export const fetchConnections = createAsyncThunk<Friend[], void, { state: RootState }>(
    'friends/fetchConnections',
    async () => {
        const token = authUtils.getToken();
        if (!token) throw new Error('No auth token');
        const res = await fetch('/api/friends/connections', {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch connections');
        return res.json();
    }
);

export const fetchPendingRequests = createAsyncThunk<FriendRequest[], void, { state: RootState }>(
    'friends/fetchPendingRequests',
    async () => {
        const token = authUtils.getToken();
        if (!token) throw new Error('No auth token');
        const res = await fetch('/api/friends/requests', {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch pending requests');
        const data = await res.json();
        return data.data || [];
    }
);

export const sendFriendRequest = createAsyncThunk<any, { receiverId: string; receiverName: string }, { state: RootState }>(
    'friends/sendFriendRequest',
    async ({ receiverId, receiverName }) => {
        const token = authUtils.getToken();
        const user = store.getState().userAuth.user;
        if (!token || !user) throw new Error('Not authenticated');
        const res = await fetch('/api/friends/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                senderId: user.gameId,
                receiverId,
                senderName: user.name,
                receiverName,
            }),
        });
        if (!res.ok) throw new Error('Failed to send friend request');
        return res.json();
    }
);

export const acceptFriendRequest = createAsyncThunk<any, { otherUserId: string }, { state: RootState }>(
    'friends/acceptFriendRequest',
    async ({ otherUserId }) => {
        const token = authUtils.getToken();
        const user = store.getState().userAuth.user;
        if (!token || !user) throw new Error('Not authenticated');
        const res = await fetch(`/api/friends/connections/${otherUserId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                senderId: user.gameId,
                receiverId: otherUserId,
                status: 'accepted',
            }),
        });
        if (!res.ok) throw new Error('Failed to accept friend request');
        return res.json();
    }
);

export const declineFriendRequest = createAsyncThunk<any, { otherUserId: string }, { state: RootState }>(
    'friends/declineFriendRequest',
    async ({ otherUserId }) => {
        const token = authUtils.getToken();
        const user = store.getState().userAuth.user;
        if (!token || !user) throw new Error('Not authenticated');
        const res = await fetch(`/api/friends/connections/${otherUserId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                senderId: user.gameId,
                receiverId: otherUserId,
                status: 'declined',
            }),
        });
        if (!res.ok) throw new Error('Failed to decline friend request');
        return res.json();
    }
);

export const removeFriend = createAsyncThunk<any, { otherUserId: string }, { state: RootState }>(
    'friends/removeFriend',
    async ({ otherUserId }) => {
        const token = authUtils.getToken();
        const user = store.getState().userAuth.user;
        if (!token || !user) throw new Error('Not authenticated');
        const res = await fetch(`/api/friends/connections/${otherUserId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                senderId: user.gameId,
                receiverId: otherUserId,
            }),
        });
        if (!res.ok) throw new Error('Failed to remove friend');
        return res.json();
    }
);

export const removePendingRequest = createAsyncThunk<any, { otherUserId: string }, { state: RootState }>(
    'friends/removePendingRequest',
    async ({ otherUserId }) => {
        const token = authUtils.getToken();
        if (!token) throw new Error('No auth token');
        const res = await fetch(`/api/friends/requests/${otherUserId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) throw new Error('Failed to remove pending request');
        return res.json();
    }
);

export const searchConnections = createAsyncThunk<Friend[], { search: string; limit?: number; page?: number }, { state: RootState }>(
    'friends/searchConnections',
    async ({ search, limit = 50, page = 1 }) => {
        const token = authUtils.getToken();
        if (!token) throw new Error('No auth token');
        const res = await fetch(`/api/friends/connections?search=${search}&limit=${limit}&page=${page}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to search connections');
        return res.json();
    }
);

export const checkFriendStatus = createAsyncThunk<any, { otherUserId: string }, { state: RootState }>(
    'friends/checkFriendStatus',
    async ({ otherUserId }) => {
        const token = authUtils.getToken();
        const user = store.getState().userAuth.user;
        if (!token || !user) throw new Error('Not authenticated');
        const res = await fetch('/api/friends/status', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify({ senderId: user.gameId, receiverId: otherUserId })
        });
        if (!res.ok) throw new Error('Failed to check friend status');
        return res.json();
    }
);

export const refreshFriendsData = createAsyncThunk<any, void, { state: RootState }>(
    'friends/refreshFriendsData',
    async (_, { dispatch }) => {
        await Promise.all([
            dispatch(fetchConnections()),
            dispatch(fetchPendingRequests())
        ]);
    }
);

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        clearFriendsState: (state) => {
            state.connections = [];
            state.pendingRequests = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConnections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConnections.fulfilled, (state, action) => {
                state.loading = false;
                state.connections = action.payload;
            })
            .addCase(fetchConnections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch connections';
            })
            .addCase(fetchPendingRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPendingRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.pendingRequests = action.payload;
            })
            .addCase(fetchPendingRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch pending requests';
            })
            .addCase(searchConnections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchConnections.fulfilled, (state, action) => {
                state.loading = false;
                state.connections = action.payload;
            })
            .addCase(searchConnections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to search connections';
            })
            .addCase(checkFriendStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkFriendStatus.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(checkFriendStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to check friend status';
            })
            .addCase(refreshFriendsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshFriendsData.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(refreshFriendsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to refresh friends data';
            });
    },
});

export const { clearFriendsState } = friendsSlice.actions;
export default friendsSlice.reducer; 