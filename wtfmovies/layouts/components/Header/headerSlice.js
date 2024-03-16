import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        modalFace: false,
    },
    reducers: {
        changeModalFace: (state, action) => {
            state.modalFace = action.payload;
        },
    },
});

export const { changeModalFace } = headerSlice.actions;

export default headerSlice.reducer;
