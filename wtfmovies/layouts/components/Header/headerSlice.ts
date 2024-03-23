'use client';
import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        emailAlert: false,
        passAlert: false,
        passAlertContent: 'Invalid password!',
    },
    reducers: {
        changeEmailAlert: (state, action) => {
            state.emailAlert = action.payload;
        },
        changePassAlert: (state, action) => {
            state.passAlert = action.payload;
        },
        changePassAlertContent: (state, action) => {
            state.passAlertContent = action.payload;
        },
    },
});

export const { changeEmailAlert, changePassAlert, changePassAlertContent } = headerSlice.actions;

export default headerSlice.reducer;
