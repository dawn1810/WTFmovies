import { createSelector } from '@reduxjs/toolkit';
import { reduxStateInterface } from '~/libs/interfaces';

//evaluate
export const rowsSelector = (state: reduxStateInterface) => state.evaluate.rows;

//profile
export const avatarSelector = (state: reduxStateInterface) => state.profile.avatar;

//register
const signupEmailAlertSelector = (state: reduxStateInterface) => state.register.signupEmailAlert;
const signupEmailAlertContentSelector = (state: reduxStateInterface) => state.register.signupEmailAlertContent;
const signupPassAlertSelector = (state: reduxStateInterface) => state.register.signupPassAlert;
const signupPassAlertContentSelector = (state: reduxStateInterface) => state.register.signupPassAlertContent;
const signupAgainPassAlertSelector = (state: reduxStateInterface) => state.register.signupAgainPassAlert;
const signupNameAlertSelector = (state: reduxStateInterface) => state.register.signupNameAlert;
const signupBirthDateAlertSelector = (state: reduxStateInterface) => state.register.signupBirthDateAlert;

//header
const modalShowSelector = (state: reduxStateInterface) => state.header.modalShow;

//AlertPOPUP
export const alertStatusSelector = (state: reduxStateInterface) => state.dataGridCom.alertStatus;

//player
export const readySelector = (state: reduxStateInterface) => state.player.ready;
export const urlSelector = (state: reduxStateInterface) => state.player.url;
export const pipSelector = (state: reduxStateInterface) => state.player.pip;
export const playingSelector = (state: reduxStateInterface) => state.player.playing;
export const controlsSelector = (state: reduxStateInterface) => state.player.controls;
export const lightSelector = (state: reduxStateInterface) => state.player.light;
export const volumeSelector = (state: reduxStateInterface) => state.player.volume;
export const mutedSelector = (state: reduxStateInterface) => state.player.muted;
export const playedSelector = (state: reduxStateInterface) => state.player.played;
export const loadedSelector = (state: reduxStateInterface) => state.player.loaded;
export const durationSelector = (state: reduxStateInterface) => state.player.duration;
export const playbackRateSelector = (state: reduxStateInterface) => state.player.playbackRate;
export const loopSelector = (state: reduxStateInterface) => state.player.loop;
export const seekingSelector = (state: reduxStateInterface) => state.player.seeking;
export const loadingSelector = (state: reduxStateInterface) => state.player.loading;
export const contactShowSelector = (state: reduxStateInterface) => state.player.contactShow;
export const centerBtnShowSelector = (state: reduxStateInterface) => state.player.centerBtnShow;
export const leftBtnShowSelector = (state: reduxStateInterface) => state.player.leftBtnShow;
export const rightBtnShowSelector = (state: reduxStateInterface) => state.player.rightBtnShow;
export const currSpeedSelector = (state: reduxStateInterface) => state.player.currSpeed;
export const currResolSelector = (state: reduxStateInterface) => state.player.currResol;
export const resolutionSelector = (state: reduxStateInterface) => state.player.resolution;

//watch
export const episodeSelector = (state: reduxStateInterface) => state.watch.episode;

export const signupSelector = createSelector(
    signupEmailAlertSelector,
    signupEmailAlertContentSelector,
    signupPassAlertSelector,
    signupPassAlertContentSelector,
    signupAgainPassAlertSelector,
    signupNameAlertSelector,
    signupBirthDateAlertSelector,
    (
        signupEmailAlert,
        signupEmailAlertContent,
        signupPassAlert,
        signupPassAlertContent,
        signupAgainPassAlert,
        signupNameAlert,
        signupBirthDateAlert,
    ) => ({
        signupEmailAlert,
        signupEmailAlertContent,
        signupPassAlert,
        signupPassAlertContent,
        signupAgainPassAlert,
        signupNameAlert,
        signupBirthDateAlert,
    }),
);

export const headerSelector = createSelector(modalShowSelector, (modalShow) => ({
    modalShow,
}));

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
    resolutionSelector,
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
        resolution,
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
        resolution,
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
    resolutionSelector,
    (
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
        resolution,
    ) => ({
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
        resolution,
    }),
);
