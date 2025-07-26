import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { store, type RootState } from '../store';
import { authUtils } from '../../../lib/user-token';
import axios from 'axios';

// Types based on backend API
export interface Friend {
    id: string;
    name: string;
}

export interface FriendRequest {
    senderId: string;
    senderName: string;
}

export interface FriendsResponse {
    friendData: Friend[];
    total: number;
}

interface FriendsState {
    connections: Friend[];
    pendingRequests: FriendRequest[];
    totalConnections: number;
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

const initialState: FriendsState = {
    connections: [],
    pendingRequests: [],
    totalConnections: 0,
    loading: false,
    error: null,
    successMessage: null,
};

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = authUtils.getToken();
    if (!token) {
        throw new Error('No auth token');
    }
    return {
        Authorization: `Bearer ${token}`,
    };
};

// Async thunks
export const sendFriendRequest = createAsyncThunk<any, { receiverId: string }, { state: RootState }>(
    'friends/sendFriendRequest',
    async ({ receiverId }, thunkAPI) => {
        try {
            const headers = getAuthHeaders();
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/friends/requests`,
                {
                    senderId: store.getState().userAuth.user?.gameId,
                    receiverId: receiverId,
                },
                { headers }
            );
            console.log('createReq', response)
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || 'Failed to send friend request');
        }
    }
);

export const fetchPendingRequests = createAsyncThunk<FriendRequest[], void, { state: RootState }>(
    'friends/fetchPendingRequests',
    async (_, thunkAPI) => {
        try {
            const headers = getAuthHeaders();
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/friends/requests`,
                { headers }
            );
            
            console.log('getpendings', response.data)
            const data = response.data.data || response.data;
            return Array.isArray(data) ? data : [];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch pending requests');
        }
    }
);

export const fetchConnections = createAsyncThunk<FriendsResponse, { search?: string; limit?: number; page?: number }, { state: RootState }>(
    'friends/fetchConnections',
    async ({ search = '', limit = 50, page = 1 }, thunkAPI) => {
        try {
            const headers = getAuthHeaders();
            const params = new URLSearchParams({
                search,
                limit: limit.toString(),
                page: page.toString(),
            });
            
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/friends/connections?${params}`,
                { headers }
            );
            
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch connections');
        }
    }
);

export const acceptFriendRequest = createAsyncThunk<any, { senderId: string }, { state: RootState }>(
    'friends/acceptFriendRequest',
    async ({ senderId }, thunkAPI) => {
        try {
            const headers = getAuthHeaders();
            const response = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/friends/requests/${senderId}`,
                {
                    status: 'accepted',
                },
                { headers }
            );
            
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || 'Failed to accept friend request');
        }
    }
);

export const declineFriendRequest = createAsyncThunk<any, { senderId: string }, { state: RootState }>(
    'friends/declineFriendRequest',
    async ({ senderId }, thunkAPI) => {
        try {
            const headers = getAuthHeaders();
            const response = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/friends/requests/${senderId}`,
                {
                    status: 'rejected',
                },
                { headers }
            );
            
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || 'Failed to decline friend request');
        }
    }
);

export const removeFriend = createAsyncThunk<any, { friendId: string }, { state: RootState }>(
    'friends/removeFriend',
    async ({ friendId }, thunkAPI) => {
        try {
            const headers = getAuthHeaders();
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/friends/connections/${friendId}`,
                { headers }
            );
            
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || 'Failed to remove friend');
        }
    }
);

export const refreshFriendsData = createAsyncThunk<any, void, { state: RootState }>(
    'friends/refreshFriendsData',
    async (_, { dispatch }) => {
        await Promise.all([
            dispatch(fetchConnections({})),
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
            state.totalConnections = 0;
            state.loading = false;
            state.error = null;
            state.successMessage = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Connections
            .addCase(fetchConnections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConnections.fulfilled, (state, action) => {
                state.loading = false;
                state.connections = action.payload.friendData;
                state.totalConnections = action.payload.total;
            })
            .addCase(fetchConnections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch connections';
            })
            // Fetch Pending Requests
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
                state.error = action.payload as string || 'Failed to fetch pending requests';
            })
            // Send Friend Request
            .addCase(sendFriendRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(sendFriendRequest.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = 'Friend request sent successfully!';
            })
            .addCase(sendFriendRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to send friend request';
            })
            // Accept Friend Request
            .addCase(acceptFriendRequest.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
                // Optimistically remove the request from pending requests
                const senderId = action.meta.arg.senderId;
                state.pendingRequests = state.pendingRequests.filter(
                    request => request.senderId !== senderId
                );
            })
            .addCase(acceptFriendRequest.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = 'Friend request accepted!';
            })
            .addCase(acceptFriendRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to accept friend request';
            })
            // Decline Friend Request
            .addCase(declineFriendRequest.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
                // Optimistically remove the request from pending requests
                const senderId = action.meta.arg.senderId;
                state.pendingRequests = state.pendingRequests.filter(
                    request => request.senderId !== senderId
                );
            })
            .addCase(declineFriendRequest.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = 'Friend request declined.';
            })
            .addCase(declineFriendRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to decline friend request';
            })
            // Remove Friend
            .addCase(removeFriend.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
                // Optimistically remove the friend from connections
                const friendId = action.meta.arg.friendId;
                state.connections = state.connections.filter(
                    friend => friend.id !== friendId
                );
            })
            .addCase(removeFriend.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = 'Friend removed successfully.';
            })
            .addCase(removeFriend.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to remove friend';
            })
            // Refresh Friends Data
            .addCase(refreshFriendsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshFriendsData.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(refreshFriendsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to refresh friends data';
            });
    },
});

export const { clearFriendsState, clearError, clearSuccessMessage } = friendsSlice.actions;
export default friendsSlice.reducer; 