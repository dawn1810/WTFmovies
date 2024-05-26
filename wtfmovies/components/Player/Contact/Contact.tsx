'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { forwardRef, useCallback, useEffect, useState, createRef, MutableRefObject } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBackwardStep,
    faCheck,
    faExpand,
    faForwardStep,
    faPause,
    faPlay,
    faVolumeHigh,
    faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';
import { faWindowRestore } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';

import {
    changeVolume,
    toggleMuted,
    changePlaybackRate,
    togglePIP,
    grabSeek,
    changeSeek,
    changeCurrentSpeed,
    changeCurrentResolution,
    showCenterBtn,
    showLeftBtn,
    showRightBtn,
    changeResolution,
} from '../playerSlice';
import { contactPlayerSelector } from '~/redux/selectors';
import style from './Contact.module.scss';
import Duration from '../Duration';
import Menu from '~/components/Popper/Menu';
import ReactPlayer from 'react-player';
import { HeaderMenuItemsInterface } from '~/libs/interfaces';
import { Button, Tooltip } from '@mui/material';


const cx = classNames.bind(style);

const VIDEO_SPEED: HeaderMenuItemsInterface[] = [
    {
        icon: null,
        title: '0.25',
    },
    {
        icon: null,
        title: '0.5',
    },
    {
        icon: null,
        title: '0.75',
    },
    {
        icon: <FontAwesomeIcon icon={faCheck} />,
        title: '1',
    },
    {
        icon: null,
        title: '1.25',
    },
    {
        icon: null,
        title: '1.5',
    },
    {
        icon: null,
        title: '1.75',
    },
    {
        icon: null,
        title: '2',
    },
];

interface ContactPlayer {
    handleClickFullscreen: (e: any) => Promise<void>,
    playerRef: any,
    isMobile?: boolean,
    handlePlayPause: (e: any) => void,
    handleMouseMove: () => void
}
const Contact = forwardRef(({ handleClickFullscreen, playerRef, handlePlayPause, handleMouseMove, isMobile }: ContactPlayer, ref: any) => {
    let x: NodeJS.Timeout, y: NodeJS.Timeout, z: NodeJS.Timeout;

    const contactState = useSelector(contactPlayerSelector);
    const dispatch = useDispatch();

    const handleTogglePIP = useCallback((e: any) => {
        e.preventDefault();

        dispatch(togglePIP(!contactState.pip));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactState.pip]);

    // const [resolution, setResolution] = useState([]);
    const [hlsPlayer, setHlsPlayer] = useState<any>({
        levels: null,
        nextLevel: null,
        currentLevel: null,
        autoLevelEnabled: false,
    });

    // Rest of your component

    useEffect(() => {
        const updateHlsPlayerInfo = (hls: any) => {
            const hasAutoLevel = hls && hls.autoLevelEnabled && hls.levels.length > 0;
            const indexLevel = hls.loadLevel !== -1 ? hls.loadLevel : hls.firstLevel;
            const currentResolution = hasAutoLevel ? `Tự động (${hls.levels[indexLevel].height}p)` : "Tự động";

            dispatch(changeCurrentResolution(currentResolution));

            const newResolutions = hls.levels.toReversed().map((item: any, index: number) => ({
                icon: hls.currentLevel === hls.levels.length ? true : null,
                title: item.height + 'p',
            }));

            if (hasAutoLevel) {
                newResolutions.push({
                    icon: true,
                    title: `Tự động`,
                });
            }
            dispatch(changeResolution(newResolutions))
        };

        if (contactState.ready && playerRef.current) {

            const internalHlsPlayer = playerRef.current.getInternalPlayer('hls');
            if (internalHlsPlayer) {
                setHlsPlayer(internalHlsPlayer);
                updateHlsPlayerInfo(internalHlsPlayer);
            }
        }

    }, [contactState.ready, dispatch]);

    // Separate useEffect if necessary based on additional logic requirements.
    useEffect(() => {
        if (hlsPlayer.nextLevel !== null && hlsPlayer.autoLevelEnabled && hlsPlayer.levels.length > 0) {
            dispatch(changeCurrentResolution(`Tự động (${hlsPlayer.levels[hlsPlayer.nextLoadLevel].height}p)`));
        }
    }, [hlsPlayer.nextLevel, dispatch]);

    // short-cut
    useEffect(() => {
        const handleKeyPress = (e: any) => {
            const currTime = playerRef.current.getCurrentTime();

            // If spacebar is pressed, toggle play/pause
            switch (e.keyCode) {
                case 32:
                    e.preventDefault();
                    handlePlayPause(e);
                    handleAnimBtnClick();
                    break;
                case 70:
                    handleClickFullscreen(e);
                    break;
                case 73:
                    handleTogglePIP(e);
                    break;
                case 37:
                case 74:
                    handleMouseMove();
                    handleAnimLeftBtnClick();
                    playerRef.current.seekTo(currTime - 5);
                    break;
                case 75:
                    handlePlayPause(e);
                    handleAnimBtnClick();
                    break;
                case 39:
                case 76:
                    handleMouseMove();
                    handleAnimRightBtnClick();
                    playerRef.current.seekTo(currTime + 5);
                    break;
                case 77:
                    handleMouseMove();
                    handleToggleMuted(e);
                    break;
                default:
                    break;
            }
        };

        // Add event listener for keydown
        window.addEventListener('keydown', handleKeyPress);

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactState]);

    const handleVolumeChange = useCallback((e: any) => {
        e.preventDefault();
        dispatch(changeVolume(e.target.value));
    }, []);

    const handleOnPlaybackRateChange = useCallback((value: string) => {

        dispatch(changePlaybackRate(value));
    }, []);

    const handleToggleMuted = useCallback((e: any) => {
        e.preventDefault();
        dispatch(toggleMuted(!contactState.muted));
    }, [contactState.muted]);

    const handleSeekMouseDown = useCallback((e: any) => {

        dispatch(grabSeek(true));
    }, []);

    const handleSeekChange = useCallback(
        (value: number) => {
            dispatch(changeSeek(value));
        },
        [contactState.seeking],
    );

    const handleSeekMouseUp = useCallback((e: any) => {

        dispatch(grabSeek(false));
        playerRef.current.seekTo(parseFloat(e.target.value));
    }, []);

    const handleSpeedSettingChange = (selectedSpeed: { title: string }) => {


        handleOnPlaybackRateChange(selectedSpeed.title);
        VIDEO_SPEED.forEach((menuItem) => {
            if (menuItem.title === selectedSpeed.title) menuItem.icon = <FontAwesomeIcon icon={faCheck} />;
            else menuItem.icon = null;
        });
        dispatch(changeCurrentSpeed(selectedSpeed.title));
    };

    const handleResolSettingChange = (selectedResol: any) => {
        let resolution = contactState.resolution;
        resolution = resolution.map((menuItem, index) => {
            if (menuItem.title === selectedResol.title) {
                if (selectedResol.title === 'Tự động') hlsPlayer.currentLevel = -1;
                else hlsPlayer.currentLevel = resolution.length - 2 - index;
                return { ...menuItem, icon: true };
            } else {
                return { ...menuItem, icon: null };
            }
        });
        // console.log(hlsPlayer.currentLevel, hlsPlayer.levels[hlsPlayer.currentLevel].height);
        dispatch(changeResolution(resolution));
        if (selectedResol.title === 'Tự động' && hlsPlayer.levels)
            dispatch(changeCurrentResolution(`Tự động (${hlsPlayer.levels[hlsPlayer.currentLevel].height}p)`));
        else
            dispatch(changeCurrentResolution(selectedResol.title));

    };

    const handleAnimBtnClick = () => {
        clearTimeout(y);
        dispatch(showCenterBtn(true));

        y = setTimeout(function () {
            dispatch(showCenterBtn(false));
        }, 500);
    };

    const handleAnimLeftBtnClick = () => {
        clearTimeout(z);
        dispatch(showLeftBtn(true));

        z = setTimeout(function () {
            dispatch(showLeftBtn(false));
        }, 500);
    };

    const handleAnimRightBtnClick = () => {
        clearTimeout(x);
        dispatch(showRightBtn(true));

        x = setTimeout(function () {
            dispatch(showRightBtn(false));
        }, 500);
    };



    // if (isMobile)

    // else
    return (
        <div ref={ref} className={cx('player-contact-wrapper', { 'contact-show': contactState.contactShow })}>
            <div className={cx('progress-bar')}>
                <progress max={1} value={contactState.loaded} className={cx('loaded-bar')} />
                <progress max={1} value={contactState.played} className={cx('played-bar')} />
                <input
                    type="range"
                    min={0}
                    max={0.999999}
                    step="any"
                    value={contactState.played}
                    className={cx('seek-bar')}
                    onMouseDown={handleSeekMouseDown}
                    onTouchStart={handleSeekMouseDown}
                    onChange={(e: any) => handleSeekChange(e.target.value)}
                    onMouseUp={(e) => handleSeekMouseUp(e)}
                    onTouchEnd={(e) => handleSeekMouseUp(e)}
                />
            </div>
            <div className={cx('btn-list')}>
                <div className={cx('left-btn-list')}>
                    <Tooltip title="Tập trước" placement="top">
                        <button onClick={(e) => e.preventDefault()} className={cx('action-btn')}>
                            <FontAwesomeIcon icon={faBackwardStep} />
                        </button>
                    </Tooltip>

                    <Tooltip title="Phát (k)" placement="top">
                        <button className={cx('action-btn')} onClick={handlePlayPause}>
                            {contactState.playing ? (
                                <FontAwesomeIcon icon={faPause} />
                            ) : (
                                <FontAwesomeIcon icon={faPlay} />
                            )}
                        </button>
                    </Tooltip>
                    <Tooltip title="Tập tiếp theo" placement="top">
                        <button onClick={(e) => e.preventDefault()} className={cx('action-btn')}>
                            <FontAwesomeIcon icon={faForwardStep} />
                        </button>
                    </Tooltip>
                    <Tooltip title={contactState.muted ? 'Bật âm thanh (m)' : 'Tắt tiếng (m)'} placement="top">
                        <button className={cx('action-btn', 'vol-btn')} onClick={handleToggleMuted}>
                            {contactState.muted ? (
                                <FontAwesomeIcon icon={faVolumeMute} />
                            ) : (
                                <FontAwesomeIcon icon={faVolumeHigh} />
                            )}
                        </button>
                    </Tooltip>
                    <Tooltip title="Âm lượng" placement="top">
                        <div className={cx('volumn-input-box')}>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step="any"
                                value={contactState.volume}
                                className={cx('volumn-input')}
                                onChange={(e) => handleVolumeChange(e)}
                            />
                        </div>
                    </Tooltip>

                    <div className={cx('duration')}>
                        <Duration seconds={contactState.duration * contactState.played} /> /{' '}
                        <Duration seconds={contactState.duration} />
                    </div>
                </div>
                <div className={cx('right-btn-list')}>
                    <Menu
                        playerMenu
                        items={VIDEO_SPEED}
                        title="Tốc độ phát"
                        placement="top"
                        delay={0}
                        onChange={handleSpeedSettingChange}
                    >
                        <button onClick={(e) => e.preventDefault()} className={cx('action-btn', 'action2-btn')}>x {contactState.currSpeed}</button>
                    </Menu>
                    <Menu
                        key={contactState.currResol}
                        playerMenu
                        items={contactState.resolution.map((menuItem) => {
                            if (menuItem.icon === true) {
                                return { ...menuItem, icon: <FontAwesomeIcon icon={faCheck} /> };
                            } else {
                                return menuItem;
                            }
                        })}
                        title="Chất lượng"
                        placement="top"
                        delay={0}
                        onChange={handleResolSettingChange}
                    >
                        <button onClick={(e) => e.preventDefault()} className={cx('action-btn', 'action2-btn')}>{contactState.currResol}</button>
                    </Menu>
                    {
                        ReactPlayer.canEnablePIP(contactState.url) &&
                        (
                            <Tooltip title="Trình phát thu nhỏ (i)" placement="top">
                                <button className={cx('action-btn')} onClick={handleTogglePIP}>
                                    <FontAwesomeIcon icon={faWindowRestore} />
                                </button>
                            </Tooltip>
                        )
                    }
                    <Tooltip title="Toàn màn hình (f)" placement="top">
                        <button className={cx('action-btn')} onClick={handleClickFullscreen}>
                            <FontAwesomeIcon icon={faExpand} />
                        </button>
                    </Tooltip>

                </div>
            </div>
        </div >
    )




});



export default Contact;
