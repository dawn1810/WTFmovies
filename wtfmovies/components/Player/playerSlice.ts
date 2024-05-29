'use client';
import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        url: '',
        pip: false,
        playing: true,
        ready: false,
        controls: false,
        light: false,
        volume: 0,
        muted: true,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
        seeking: false,
        loading: false,
        contactShow: false,
        centerBtnShow: false,
        leftBtnShow: false,
        rightBtnShow: false,
        currSpeed: '1',
        currResol: 'N/A',
        resolution: []
    },
    reducers: {
        changeUrl: (state, action) => {
            state.url = action.payload;
        },
        changeReady: (state, action) => {
            state.ready = action.payload;
        },
        changePlayPause: (state, action) => {
            state.playing = action.payload;
        },
        changeVolume: (state, action) => {
            state.volume = parseFloat(action.payload);
            state.muted = false;
        },
        toggleMuted: (state, action) => {
            state.muted = action.payload;
        },
        changePlaybackRate: (state, action) => {
            state.playbackRate = parseFloat(action.payload);
        },
        togglePIP: (state, action) => {
            state.pip = action.payload;
        },
        grabSeek: (state, action) => {
            state.seeking = action.payload;
        },
        changeSeek: (state, action) => {
            state.played = parseFloat(action.payload);
        },
        changeProgress: (state, action) => {
            state.played = action.payload.played;
            state.loaded = action.payload.loaded;
        },
        changeDuration: (state, action) => {
            state.duration = action.payload;
        },
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
        showContact: (state, action) => {
            state.contactShow = action.payload;
        },
        showCenterBtn: (state, action) => {
            state.centerBtnShow = action.payload;
        },
        showLeftBtn: (state, action) => {
            state.leftBtnShow = action.payload;
        },
        showRightBtn: (state, action) => {
            state.rightBtnShow = action.payload;
        },
        changeCurrentSpeed: (state, action) => {
            state.currSpeed = action.payload;
        },
        changeCurrentResolution: (state, action) => {
            state.currResol = action.payload;
        },
        changeResolution: (state, action) => {
            state.resolution = action.payload;
        },
    },
});

export const {
    changeUrl,
    changeReady,
    changePlayPause,
    changeVolume,
    toggleMuted,
    changePlaybackRate,
    togglePIP,
    grabSeek,
    changeSeek,
    changeProgress,
    changeDuration,
    changeLoading,
    showContact,
    showCenterBtn,
    showLeftBtn,
    showRightBtn,
    changeCurrentSpeed,
    changeCurrentResolution,
    changeResolution,
} = playerSlice.actions;

export default playerSlice.reducer;
