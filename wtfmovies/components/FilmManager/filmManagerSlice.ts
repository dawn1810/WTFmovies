'use client';
import { createSlice } from '@reduxjs/toolkit';

export const filmManagerSlice = createSlice({
    name: 'editor',
    initialState: {
        alertStatus: { content: null, status: null },
        films: [],
        selectedFilm: null,
        formOpen: false,
    },
    reducers: {
        changeAlertStatus: (state, action) => {
            state.alertStatus = action.payload;
        },
        setFilms: (state, action) => {
            state.films = action.payload;
        },
        setSelectedFilm: (state, action) => {
            state.selectedFilm = action.payload;
        },
        setFormOpen: (state, action) => {
            state.formOpen = action.payload;
        },
    },
});

export const { changeAlertStatus, setFilms, setSelectedFilm, setFormOpen } = filmManagerSlice.actions;

export default filmManagerSlice.reducer;
