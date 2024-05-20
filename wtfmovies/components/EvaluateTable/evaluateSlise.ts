import { createSlice } from '@reduxjs/toolkit';

export const evaluateSlice = createSlice({
    name: 'evaluate',
    initialState: {
        rows: [],
    },
    reducers: {
        changeRow: (state, action) => {
            state.rows = action.payload;
        },
    },
});

export const { changeRow } = evaluateSlice.actions;

export default evaluateSlice.reducer;
