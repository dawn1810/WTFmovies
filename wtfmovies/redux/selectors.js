import { createSelector } from '@reduxjs/toolkit';
//player
export const readySelector = (state) => state.player.ready;
export const urlSelector = (state) => state.player.url;
export const pipSelector = (state) => state.player.pip;
export const playingSelector = (state) => state.player.playing;
export const controlsSelector = (state) => state.player.controls;
export const lightSelector = (state) => state.player.light;
export const volumeSelector = (state) => state.player.volume;
export const mutedSelector = (state) => state.player.muted;
export const playedSelector = (state) => state.player.played;
export const loadedSelector = (state) => state.player.loaded;
export const durationSelector = (state) => state.player.duration;
export const playbackRateSelector = (state) => state.player.playbackRate;
export const loopSelector = (state) => state.player.loop;
export const seekingSelector = (state) => state.player.seeking;
export const loadingSelector = (state) => state.player.loading;
export const contactShowSelector = (state) => state.player.contactShow;
export const centerBtnShowSelector = (state) => state.player.centerBtnShow;
export const leftBtnShowSelector = (state) => state.player.leftBtnShow;
export const rightBtnShowSelector = (state) => state.player.rightBtnShow;
export const currSpeedSelector = (state) => state.player.currSpeed;
export const currResolSelector = (state) => state.player.currResol;
export const playerResolutionSelector = (state) => state.player.playerResolution;
export const hlsPlayerSelector = (state) => state.player.hlsPlayer;

export const playerSelector = createSelector(
    urlSelector,
    pipSelector,
    playingSelector,
    controlsSelector,
    lightSelector,
    volumeSelector,
    mutedSelector,
    playedSelector,
    loadedSelector,
    durationSelector,
    playbackRateSelector,
    loopSelector,
    seekingSelector,
    loadingSelector,
    contactShowSelector,
    centerBtnShowSelector,
    leftBtnShowSelector,
    rightBtnShowSelector,
    currSpeedSelector,
    currResolSelector,
    (
        url,
        pip,
        playing,
        controls,
        light,
        volume,
        muted,
        played,
        loaded,
        duration,
        playbackRate,
        loop,
        seeking,
        loading,
        contactShow,
        centerBtnShow,
        leftBtnShow,
        rightBtnShow,
        currSpeed,
        currResol,
    ) => ({
        url,
        pip,
        playing,
        controls,
        light,
        volume,
        muted,
        played,
        loaded,
        duration,
        playbackRate,
        loop,
        seeking,
        loading,
        contactShow,
        centerBtnShow,
        leftBtnShow,
        rightBtnShow,
        currSpeed,
        currResol,
    }),
);

export const coverPlayerSelector = createSelector(
    playingSelector,
    loadingSelector,
    centerBtnShowSelector,
    leftBtnShowSelector,
    rightBtnShowSelector,
    (playing, loading, centerBtn, leftBtn, rightBtn) => ({
        playing,
        loading,
        centerBtn,
        leftBtn,
        rightBtn,
    }),
);

export const contactPlayerSelector = createSelector(
    readySelector,
    urlSelector,
    loadedSelector,
    playedSelector,
    playingSelector,
    mutedSelector,
    volumeSelector,
    durationSelector,
    currSpeedSelector,
    currResolSelector,
    contactShowSelector,
    pipSelector,
    (ready, url, loaded, played, playing, muted, volume, duration, currSpeed, currResol, contactShow, pip) => ({
        ready,
        url,
        loaded,
        played,
        playing,
        muted,
        volume,
        duration,
        currSpeed,
        currResol,
        contactShow,
        pip,
    }),
);
