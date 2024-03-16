export const changeModalFace = (modalFace) => {
    return {
        type: 'header/changeModalFace',
        payload: modalFace,
    };
};

export const changeUrl = (url) => {
    return {
        type: 'player/changeUrl',
        payload: url,
    };
};

export const changeReady = (ready) => {
    return {
        type: 'player/changeReady',
        payload: ready,
    };
};

export const changePlayPause = (playing) => {
    return {
        type: 'player/changePlayPause',
        payload: playing,
    };
};

export const changeVolume = (volume) => {
    return {
        type: 'player/changeVolume',
        payload: volume,
    };
};

export const toggleMuted = (mute) => {
    return {
        type: 'player/toggleMuted',
        payload: mute,
    };
};

export const changePlaybackRate = (playbackRate) => {
    return {
        type: 'player/changePlaybackRate',
        payload: playbackRate,
    };
};

export const togglePIP = (pip) => {
    return {
        type: 'player/togglePIP',
        payload: pip,
    };
};

export const grabSeek = (seeking) => {
    return {
        type: 'player/grabSeek',
        payload: seeking,
    };
};

export const changeSeek = (played) => {
    return {
        type: 'player/changeSeek',
        payload: played,
    };
};

export const changeProgress = (progress) => {
    return {
        type: 'player/changeProgress',
        payload: progress,
    };
};

export const changeDuration = (duration) => {
    return {
        type: 'player/changeDuration',
        payload: duration,
    };
};

export const changeLoading = (loading) => {
    return {
        type: 'player/changeLoading',
        payload: loading,
    };
};

export const showContact = (contactShow) => {
    return {
        type: 'player/showContact',
        payload: contactShow,
    };
};

export const showCenterBtn = (centerBtnShow) => {
    return {
        type: 'player/showCenterBtn',
        payload: centerBtnShow,
    };
};

export const showLeftBtn = (leftBtnShow) => {
    return {
        type: 'player/showLeftBtn',
        payload: leftBtnShow,
    };
};

export const showRightBtn = (rightBtnShow) => {
    return {
        type: 'player/showRightBtn',
        payload: rightBtnShow,
    };
};

export const changeCurrentSpeed = (currSpeed) => {
    return {
        type: 'player/changeCurrentSpeed',
        payload: currSpeed,
    };
};

export const changeCurrentResolution = (currResol) => {
    return {
        type: 'player/changeCurrentResolution',
        payload: currResol,
    };
};
