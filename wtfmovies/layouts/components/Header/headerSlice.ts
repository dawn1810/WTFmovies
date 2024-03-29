'use client';
import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        modalShow: false,
        emailAlert: false,
        passAlert: false,
        currentUser: false,
        query: '',
    },
    reducers: {
        changeModalShow: (state, action) => {
            state.modalShow = action.payload;
        },
        changeEmailAlert: (state, action) => {
            state.emailAlert = action.payload;
        },
        changePassAlert: (state, action) => {
            state.passAlert = action.payload;
        },
        changeCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        changeSearchQuery: (state, action) => {
            state.query = action.payload;
        },
    },
});

export const { changeModalShow, changeEmailAlert, changePassAlert, changeCurrentUser, changeSearchQuery } =
    headerSlice.actions;

export default headerSlice.reducer;
