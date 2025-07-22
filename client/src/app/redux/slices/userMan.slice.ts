import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authUtils } from "../../../lib/admin-token";

export type FilterTypes = {
    searchName: string,
    page: number,
    limit: number,
    sortType?: number,
    sortDes?: string
}

export type UpdateUserTypes = {
    gameId: string,
    status: "active" | "banned" | "suspended"
}

export const getUsersThunk = createAsyncThunk(
    "fetchUsers",
    async ({ searchName, page, limit, sortType, sortDes }: FilterTypes, { rejectWithValue }) => {
        try {
            const token = authUtils.getToken();
            const response = await axios.get(
                `http://localhost:8000/admin/users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        search: searchName,
                        page: page,
                        limit: limit,
                        sortType: sortType,
                        sortDes: sortDes
                    }
                }
            )
            return {
                users: response.data.users,
                total: response.data.total,
                page: response.data.page,
                totalPages: response.data.totalPages
            }
        } catch (error) {
            const err = error as { message?: string };
            return rejectWithValue(err.message || "Failed to fetch users");
        }
    }
)

export const updateUserThunk = createAsyncThunk(
    "updateUser",
    async ({ gameId, status }: UpdateUserTypes, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `http://localhost:8000/admin/status`,
                {
                    gameId: gameId,
                    status: status
                },
                {
                    headers: {
                        Authorization: `Bearer ${authUtils.getToken()}`
                    }
                }
            )

            return response.data;
        } catch (error) {
            const err = error as { message?: string };
            return rejectWithValue(err.message || "Failed to update user status");
        }
    }
)

// Add User type based on provided structure
export type User = {
    gameId: string;
    name: string;
    email: string;
    status: "active" | "banned" | "suspended";
    createdAt: string;
};

interface UserState {
    users: User[];
    isLoadingUsers: boolean,
    isUpdatingUser: boolean,
    error: string | undefined,
    pages: number,
    total: number,
    totalPages: number,
    searchTerm: string,
    debouncedSearchTerm: string,
    page: number,
    sortField: 'name' | 'email' | 'status' | 'createdAt',
    sortDirection: 'asc' | 'desc'
}

const initialState: UserState = {
    users: [],
    isLoadingUsers: false,
    isUpdatingUser: false,
    error: undefined,
    pages: 1,
    total: 0,
    totalPages: 0,
    searchTerm: '',
    debouncedSearchTerm: '',
    page: 1,
    sortField: 'name',
    sortDirection: 'desc'
}

const userManSlice = createSlice({
    name: 'userMan',
    initialState,
    reducers: {
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        setDebouncedSearchTerm(state, action) {
            state.debouncedSearchTerm = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
        setSortField(state, action) {
            state.sortField = action.payload;
        },
        setSortDirection(state, action) {
            state.sortDirection = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersThunk.pending, state => {
                state.isLoadingUsers = true;
                state.error = undefined;
            })
            .addCase(getUsersThunk.fulfilled, (state, action) => {
                if (action.payload && typeof action.payload === 'object' && 'users' in action.payload) {
                    const payload = action.payload;
                    state.isLoadingUsers = false;
                    state.error = undefined;
                    state.users = payload.users;
                    state.pages = payload.page;
                    state.total = payload.total;
                    state.totalPages = payload.totalPages;
                }
            })
            .addCase(getUsersThunk.rejected, (state) => {
                state.isLoadingUsers = false;
                state.error = "Failed to fetch users";
            })
            .addCase(updateUserThunk.pending, state => {
                state.isUpdatingUser = true;
                state.error = undefined;
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.isUpdatingUser = false;
                state.error = undefined;
                const { gameId, status } = action.meta.arg;
                const target = state.users.find((item) => item.gameId === gameId);
                if (target) target.status = status;
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.isUpdatingUser = false;
                state.error = action.payload as string || action.error?.message || "Failed to update user status";
            })
    }
})

export const { setSearchTerm, setDebouncedSearchTerm, setPage, setSortField, setSortDirection } = userManSlice.actions;

export default userManSlice.reducer