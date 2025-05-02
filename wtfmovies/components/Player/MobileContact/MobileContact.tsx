'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import PictureInPictureAltOutlinedIcon from '@mui/icons-material/PictureInPictureAltOutlined';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import classNames from 'classnames/bind';

import style from './MobileContact.module.scss';
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
import Duration from '../Duration';
import Menu from '~/components/Popper/Menu';
import ReactPlayer from 'react-player';
import { HeaderMenuItemsInterface } from '~/libs/interfaces';

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
        icon: <CheckIcon />,
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
    handleClickFullscreen: (e: any) => Promise<void>;
    playerRef: any;
    isEdior?: boolean;
    handlePlayPause: (e: any) => void;
    handleMouseMove: () => void;
}
const Contact = forwardRef(
    ({ handleClickFullscreen, playerRef, handlePlayPause, handleMouseMove, isEdior }: ContactPlayer, ref: any) => {
        let x: NodeJS.Timeout, y: NodeJS.Timeout, z: NodeJS.Timeout;

        const contactState = useSelector(contactPlayerSelector);
        const dispatch = useDispatch();

        const handleTogglePIP = useCallback(
            (e: any) => {
                e.preventDefault();

                dispatch(togglePIP(!contactState.pip));

                // eslint-disable-next-line react-hooks/exhaustive-deps
            },
            [contactState.pip],
        );
        // const [resolution, setResolution] = useState([]);
        const [hlsPlayer, setHlsPlayer] = useState<any>({
            levels: null,
            nextLevel: null,
            currentLevel: null,
            autoLevelEnabled: false,
        });
        const [advContact, setAdvContact] = useState(false);

        // Rest of your component
        useEffect(() => {
            const updateHlsPlayerInfo = (hls: any) => {
                const hasAutoLevel = hls && hls.autoLevelEnabled && hls.levels.length > 0;
                const indexLevel = hls.loadLevel !== -1 ? hls.loadLevel : hls.firstLevel;
                const currentResolution = hasAutoLevel ? `Tự động (${hls.levels[indexLevel].height}p)` : 'Tự động';

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
                dispatch(changeResolution(newResolutions));
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

        const handleOnPlaybackRateChange = useCallback((value: string) => {
            dispatch(changePlaybackRate(value));
        }, []);

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
                if (menuItem.title === selectedSpeed.title) menuItem.icon = <CheckIcon />;
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
            else dispatch(changeCurrentResolution(selectedResol.title));
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

        // else
        return (
            <div
                ref={ref}
                className={cx('player-contact-wrapper', {
                    'contact-show': !contactState.playing,
                })}
            >
                <div style={{ display: advContact ? 'flex' : 'none' }} className={cx('btn-list')}>
                    <div className={cx('left-btn-list')}></div>
                    <div className={cx('right-btn-list')}>
                        <Menu
                            playerMenu
                            items={VIDEO_SPEED}
                            title="Tốc độ phát"
                            placement="top"
                            delay={0}
                            onChange={handleSpeedSettingChange}
                        >
                            <button onClick={(e) => e.preventDefault()} className={cx('action-btn', 'action2-btn')}>
                                x {contactState.currSpeed}
                            </button>
                        </Menu>
                        {isEdior || !!contactState.currResol || (
                            <Menu
                                key={contactState.currResol}
                                playerMenu
                                items={contactState.resolution.map((menuItem) => {
                                    if (menuItem.icon === true) {
                                        return { ...menuItem, icon: <CheckIcon /> };
                                    } else {
                                        return menuItem;
                                    }
                                })}
                                title="Chất lượng"
                                placement="top"
                                delay={0}
                                onChange={handleResolSettingChange}
                            >
                                <button onClick={(e) => e.preventDefault()} className={cx('action-btn', 'action2-btn')}>
                                    {contactState.currResol}
                                </button>
                            </Menu>
                        )}
                    </div>
                </div>
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
                        <div className={cx('duration', isEdior && 'duration-editor')}>
                            <Duration seconds={contactState.duration * contactState.played} /> /{' '}
                            <Duration seconds={contactState.duration} />
                        </div>
                    </div>
                    <div className={cx('right-btn-list')}>
                        {ReactPlayer.canEnablePIP(contactState.url) && (
                            <Tooltip title="Trình phát thu nhỏ (i)" placement="top">
                                <IconButton aria-label="delete" size="large" onClick={handleTogglePIP}>
                                    <PictureInPictureAltOutlinedIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip title="Toàn màn hình (f)" placement="top">
                            <IconButton aria-label="delete" size="large" onClick={() => setAdvContact((prev) => !prev)}>
                                <SettingsOutlinedIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Toàn màn hình (f)" placement="top">
                            <IconButton aria-label="delete" size="large" onClick={handleClickFullscreen}>
                                <ZoomOutMapIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
        );
    },
);

export default Contact;
