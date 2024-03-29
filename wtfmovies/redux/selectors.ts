import { createSelector } from '@reduxjs/toolkit';
import { reduxStateInterface } from '~/libs/interfaces';

//signup
const signupEmailAlertSelector = (state: reduxStateInterface) => state.signup.signupEmailAlert;
const signupEmailAlertContentSelector = (state: reduxStateInterface) => state.signup.signupEmailAlertContent;
const signupPassAlertSelector = (state: reduxStateInterface) => state.signup.signupPassAlert;
const signupPassAlertContentSelector = (state: reduxStateInterface) => state.signup.signupPassAlertContent;
const signupAgainPassAlertSelector = (state: reduxStateInterface) => state.signup.signupAgainPassAlert;
const signupNameAlertSelector = (state: reduxStateInterface) => state.signup.signupNameAlert;
const signupBirthDateAlertSelector = (state: reduxStateInterface) => state.signup.signupBirthDateAlert;
const currentFormSelector = (state: reduxStateInterface) => state.signup.currentForm;

//header
const modalShowSelector = (state: reduxStateInterface) => state.header.modalShow;
const emailAlertSelector = (state: reduxStateInterface) => state.header.emailAlert;
const passAlertSelector = (state: reduxStateInterface) => state.header.passAlert;
const currentUserSelector = (state: reduxStateInterface) => state.header.currentUser;
export const searchQuerySelector = (state: reduxStateInterface) => state.header.query;

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

export const signupSelector = createSelector(
    signupEmailAlertSelector,
    signupEmailAlertContentSelector,
    signupPassAlertSelector,
    signupPassAlertContentSelector,
    signupAgainPassAlertSelector,
    signupNameAlertSelector,
    signupBirthDateAlertSelector,
    currentFormSelector,
    (
        signupEmailAlert,
        signupEmailAlertContent,
        signupPassAlert,
        signupPassAlertContent,
        signupAgainPassAlert,
        signupNameAlert,
        signupBirthDateAlert,
        currentForm,
    ) => ({
        signupEmailAlert,
        signupEmailAlertContent,
        signupPassAlert,
        signupPassAlertContent,
        signupAgainPassAlert,
        signupNameAlert,
        signupBirthDateAlert,
        currentForm,
    }),
);

export const headerSelector = createSelector(
    modalShowSelector,
    emailAlertSelector,
    passAlertSelector,
    currentUserSelector,
    searchQuerySelector,
    (modalShow, emailAlert, passAlert, currentUser, searchQuery) => ({
        modalShow,
        emailAlert,
        passAlert,
        currentUser,
        searchQuery,
    }),
);

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