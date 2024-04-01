'use client';
import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        modalShow: false,
        query: '',
    },
    reducers: {
        changeModalShow: (state, action) => {
            state.modalShow = action.payload;
        },
        changeSearchQuery: (state, action) => {
            state.query = action.payload;
        },
    },
});

export const { changeModalShow, changeSearchQuery } = headerSlice.actions;

export default headerSlice.reducer;
