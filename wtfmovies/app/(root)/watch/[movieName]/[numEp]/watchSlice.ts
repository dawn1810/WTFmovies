'use client';
import { createSlice } from '@reduxjs/toolkit';

export const watchSlice = createSlice({
    name: 'watchSlice',
    initialState: {
        episode: { _id: '', index: 1, rating: 0, link: '' }
    },
    reducers: {
        changeEpisode: (state, action) => {
            state.episode = action.payload;
        },
    },
});

export const { changeEpisode } = watchSlice.actions;

export default watchSlice.reducer;
