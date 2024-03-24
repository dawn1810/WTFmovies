'use client';
import { createSlice } from '@reduxjs/toolkit';

export const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        signupEmailAlert: false,
        signupPassAlert: false,
        signupPassAlertContent: 'Mật khẩu không hợp lệ!',
        signupAgainPassAlert: false,
        signupNameAlert: false,
        signupBirthDateAlert: false,
        currentForm: 0,
    },
    reducers: {
        changeSignUpEmailAlert: (state, action) => {
            state.signupEmailAlert = action.payload;
        },
        changeSignUpPassAlert: (state, action) => {
            state.signupPassAlert = action.payload;
        },
        changeSignUpPassAlertContent: (state, action) => {
            state.signupPassAlertContent = action.payload;
        },
        changeSignupAgainPassAlert: (state, action) => {
            state.signupAgainPassAlert = action.payload;
        },
        changeSignUpNameAlert: (state, action) => {
            state.signupNameAlert = action.payload;
        },
        changeSignUpBirthDateAlert: (state, action) => {
            state.signupBirthDateAlert = action.payload;
        },
        changeCurrentForm: (state, action) => {
            state.currentForm = action.payload;
        },
    },
});

export const {
    changeSignUpEmailAlert,
    changeSignUpPassAlert,
    changeSignUpPassAlertContent,
    changeSignupAgainPassAlert,
    changeSignUpNameAlert,
    changeSignUpBirthDateAlert,
    changeCurrentForm,
} = signupSlice.actions;

export default signupSlice.reducer;
