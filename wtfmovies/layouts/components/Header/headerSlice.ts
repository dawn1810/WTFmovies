import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        modalShow: false,
        query: '',
        fbDialog: false,
        fbDialogType: 'report',
        rpContent: '',
        wsdata: '',
    },
    reducers: {
        changeModalShow: (state, action) => {
            state.modalShow = action.payload;
        },
        changeFbDialog: (state, action) => {
            state.fbDialog = action.payload;
        },
        changeFbDialogType: (state, action) => {
            state.fbDialogType = action.payload;
        },
        changeRpContent: (state, action) => {
            state.rpContent = action.payload;
        },
        changeWsdata: (state, action) => {
            state.wsdata = action.payload;
        },
    },
});

export const { changeModalShow, changeFbDialog, changeFbDialogType, changeRpContent, changeWsdata } =
    headerSlice.actions;

export default headerSlice.reducer;
