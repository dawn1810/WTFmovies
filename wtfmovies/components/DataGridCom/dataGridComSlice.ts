'use client';
import { createSlice } from '@reduxjs/toolkit';

export const dataGridComSlice = createSlice({
    name: 'dataGridCom',
    initialState: {
        alertStatus: { content: null, status: null }
    },
    reducers: {
        changeAlertStatus: (state, action) => {
            state.alertStatus = action.payload;
        },
    },
});

export const { changeAlertStatus } = dataGridComSlice.actions;

export default dataGridComSlice.reducer;
