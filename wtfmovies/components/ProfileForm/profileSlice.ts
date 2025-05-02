import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        avatar: null,
    },
    reducers: {
        changeAvatar: (state, action) => {
            state.avatar = action.payload;
        },
    },
});

export const { changeAvatar } = profileSlice.actions;

export default profileSlice.reducer;
