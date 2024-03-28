// signup
export const changeSignUpEmailAlert = (emailAlert: boolean) => {
    return {
        type: 'signup/changeSignUpEmailAlert',
        payload: emailAlert,
    };
};

export const changeSignupEmailAlertContent = (emailAlertContent: boolean) => {
    return {
        type: 'signup/changeSignupEmailAlertContent',
        payload: emailAlertContent,
    };
};

export const changeSignUpPassAlert = (passAlert: boolean) => {
    return {
        type: 'signup/changeSignUpPassAlert',
        payload: passAlert,
    };
};

export const changeSignUpPassAlertContent = (passAlertContent: string) => {
    return {
        type: 'signup/changeSignUpPassAlertContent',
        payload: passAlertContent,
    };
};

export const changeSignupAgainPassAlert = (againPassAlert: boolean) => {
    return {
        type: 'signup/changeSignupAgainPassAlert',
        payload: againPassAlert,
    };
};

export const changeSignUpNameAlert = (nameAlert: boolean) => {
    return {
        type: 'signup/changeSignUpNameAlert',
        payload: nameAlert,
    };
};

export const changeSignUpBirthDateAlert = (birthDateAlert: boolean) => {
    return {
        type: 'signup/changeSignUpBirthDateAlert',
        payload: birthDateAlert,
    };
};

export const changeCurrentForm = (currForm: number) => {
    return {
        type: 'header/changeCurrentForm',
        payload: currForm,
    };
};

// header
export const changeEmailAlert = (emailAlert: boolean) => {
    return {
        type: 'header/changeEmailAlert',
        payload: emailAlert,
    };
};

export const changePassAlert = (passAlert: boolean) => {
    return {
        type: 'signup/changePassAlert',
        payload: passAlert,
    };
};

export const changePassAlertContent = (passAlertContent: string) => {
    return {
        type: 'header/changePassAlertContent',
        payload: passAlertContent,
    };
};

export const changeCurrentUser = (currentUser: string) => {
    return {
        type: 'header/changeCurrentUser',
        payload: currentUser,
    };
};

export const changeSearchQuery = (query: string) => {
    return {
        type: 'header/changeSearchQuery',
        payload: query,
    };
};

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
