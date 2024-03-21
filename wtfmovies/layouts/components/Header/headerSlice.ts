'use client';
import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
    name: 'player',
    initialState: {
        emailAlert: false,
        emailAlertContent: '',
        passAlert: false,
        passAlertContent: '',
    },
    reducers: {
        changeEmailAlert: (state, action) => {
            state.emailAlert = action.payload;
        },
        changeEmailAlertContent: (state, action) => {
            state.emailAlertContent = action.payload;
        },
        changePassAlert: (state, action) => {
            state.passAlert = action.payload;
        },
        changePassAlertContent: (state, action) => {
            state.passAlertContent = action.payload;
        },
    },
});

export const { changeEmailAlert, changeEmailAlertContent, changePassAlert, changePassAlertContent } =
    headerSlice.actions;

export default headerSlice.reducer;
