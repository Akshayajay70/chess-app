import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    loading: boolean;
    matchRoomId: string | null,

}

const initialState: UserState = {
    loading: false,
    matchRoomId: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {}
})

export default userSlice.reducer