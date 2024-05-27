import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        modalShow: false,
        query: '',
        feedbackDialog: false,
    },
    reducers: {
        changeModalShow: (state, action) => {
            state.modalShow = action.payload;
        },
    },
});

export const { changeModalShow } = headerSlice.actions;

export default headerSlice.reducer;
