'use client';
import { createSlice } from '@reduxjs/toolkit';

export const filmManagerSlice = createSlice({
    name: 'editor',
    initialState: {
        alertStatus: { content: null, status: null },


    },
    reducers: {
        changeAlertStatus: (state, action) => {
            state.alertStatus = action.payload;
        },

    },
});

export const { changeAlertStatus } = filmManagerSlice.actions;

export default filmManagerSlice.reducer;
