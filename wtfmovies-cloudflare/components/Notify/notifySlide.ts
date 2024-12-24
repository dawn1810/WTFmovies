import { createSlice } from '@reduxjs/toolkit';

export const notifySlice = createSlice({
    name: 'notify',
    initialState: {
        open: false,
        content: 'thông báo ở đây nè kkk',
        type: 'success',
    },
    reducers: {
        changeOpen: (state, action) => {
            state.open = action.payload;
        },
        changeContent: (state, action) => {
            state.content = action.payload;
        },
        changeType: (state, action) => {
            state.type = action.payload;
        },
        showNotify: (state, action) => {
            state.type = action.payload.type;
            state.content = action.payload.content;
            state.open = action.payload.open;
        },
    },
});

export const { changeOpen, changeContent, changeType, showNotify } = notifySlice.actions;

export default notifySlice.reducer;
