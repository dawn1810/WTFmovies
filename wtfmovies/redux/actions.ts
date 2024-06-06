//import { AlertColor } from '@mui/material';

import { DateMongo, ObjectMongo } from "~/libs/interfaces";

// signup
export const changeSignUpEmailAlert = (emailAlert: boolean) => {
    return {
        type: 'register/changeSignUpEmailAlert',
        payload: emailAlert,
    };
};

export const changeSignupEmailAlertContent = (emailAlertContent: boolean) => {
    return {
        type: 'register/changeSignupEmailAlertContent',
        payload: emailAlertContent,
    };
};

export const changeSignUpPassAlert = (passAlert: boolean) => {
    return {
        type: 'register/changeSignUpPassAlert',
        payload: passAlert,
    };
};

export const changeSignUpPassAlertContent = (passAlertContent: string) => {
    return {
        type: 'register/changeSignUpPassAlertContent',
        payload: passAlertContent,
    };
};

export const changeSignupAgainPassAlert = (againPassAlert: boolean) => {
    return {
        type: 'register/changeSignupAgainPassAlert',
        payload: againPassAlert,
    };
};

export const changeSignUpNameAlert = (nameAlert: boolean) => {
    return {
        type: 'register/changeSignUpNameAlert',
        payload: nameAlert,
    };
};

export const changeSignUpBirthDateAlert = (birthDateAlert: boolean) => {
    return {
        type: 'register/changeSignUpBirthDateAlert',
        payload: birthDateAlert,
    };
};

// header
export const changeModalShow = (modalShow: boolean) => {
    return {
        type: 'header/changeModalShow',
        payload: modalShow,
    };
};

//


// player
export const changeUrl = (url: string) => {
    return {
        type: 'player/changeUrl',
        payload: url,
    };
};

export const changeReady = (ready: boolean) => {
    return {
        type: 'player/changeReady',
        payload: ready,
    };
};

export const changePlayPause = (playing: boolean) => {
    return {
        type: 'player/changePlayPause',
        payload: playing,
    };
};

export const changeVolume = (volume: number) => {
    return {
        type: 'player/changeVolume',
        payload: volume,
    };
};

export const toggleMuted = (muted: boolean) => {
    return {
        type: 'player/toggleMuted',
        payload: muted,
    };
};

export const changePlaybackRate = (playbackRate: number) => {
    return {
        type: 'player/changePlaybackRate',
        payload: playbackRate,
    };
};

export const togglePIP = (pip: boolean) => {
    return {
        type: 'player/togglePIP',
        payload: pip,
    };
};

export const grabSeek = (seeking: boolean) => {
    return {
        type: 'player/grabSeek',
        payload: seeking,
    };
};

export const changeSeek = (played: number) => {
    return {
        type: 'player/changeSeek',
        payload: played,
    };
};

export const changeProgress = (progress: { played: number; loaded: number }) => {
    return {
        type: 'player/changeProgress',
        payload: progress,
    };
};

export const changeDuration = (duration: number) => {
    return {
        type: 'player/changeDuration',
        payload: duration,
    };
};

export const changeLoading = (loading: boolean) => {
    return {
        type: 'player/changeLoading',
        payload: loading,
    };
};

export const showContact = (contactShow: boolean) => {
    return {
        type: 'player/showContact',
        payload: contactShow,
    };
};

export const showCenterBtn = (centerBtnShow: boolean) => {
    return {
        type: 'player/showCenterBtn',
        payload: centerBtnShow,
    };
};

export const showLeftBtn = (leftBtnShow: boolean) => {
    return {
        type: 'player/showLeftBtn',
        payload: leftBtnShow,
    };
};

export const showRightBtn = (rightBtnShow: boolean) => {
    return {
        type: 'player/showRightBtn',
        payload: rightBtnShow,
    };
};

export const changeCurrentSpeed = (currSpeed: string) => {
    return {
        type: 'player/changeCurrentSpeed',
        payload: currSpeed,
    };
};

export const changeCurrentResolution = (currResol: string) => {
    return {
        type: 'player/changeCurrentResolution',
        payload: currResol,
    };
};

export const changeResolution = (resolution: any[]) => {
    return {
        type: 'player/changeResolution',
        payload: resolution,
    };
};

//Watch
export const changeEpisode = (episode: any) => {
    return {
        type: 'watch/changeResolution',
        payload: episode,
    };
};

// Profile
export const changeAvatar = (avatar: any) => {
    return {
        type: 'profile/changeAvatar',
        payload: avatar,
    };
};

// Notify
export const changeNotifyOpen = (open: boolean) => {
    return {
        type: 'notify/changeOpen',
        payload: open,
    };
};

export const changeNotifyContent = (content: string) => {
    return {
        type: 'notify/changeContent',
        payload: content,
    };
};

export const changeNotifyType = (type?: any) => {
    return {
        type: 'notify/changeType',
        payload: type,
    };
};

// Feedback

export const changeFbDialog = (open: boolean) => {
    return {
        type: 'header/changeFbDialog',
        payload: open,
    };
};

export const changeFbDialogType = (type: 'report' | 'feedback') => {
    return {
        type: 'header/changeFbDialogType',
        payload: type,
    };
};

export const changeRpContent = (content: string) => {
    return {
        type: 'header/changeRpContent',
        payload: content,
    };
};


// Editor
export const changeAlertStatus = (status: { content: any; status: boolean }) => {
    return {
        type: 'editor/changeAlertStatus',
        payload: status,
    };
};

