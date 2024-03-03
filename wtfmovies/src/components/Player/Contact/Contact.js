/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react';
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
} from '../playerSlice';
import { contactPlayerSelector } from '~/redux/selectors';
import style from './Contact.module.scss';
import Duration from '../Duration';
import Menu from '~/components/Popper/Menu';
import ReactPlayer from 'react-player';

const cx = classNames.bind(style);

const VIDEO_SPEED = [
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

const Contact = forwardRef(({ handleClickFullscreen, playerRef, handlePlayPause, handleMouseMove }, ref) => {
    let x, y, z;

    const contactState = useSelector(contactPlayerSelector);

    const dispatch = useDispatch();

    const handleTogglePIP = useCallback(() => {
        dispatch(togglePIP(!contactState.pip));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactState.pip]);

    const [resolution, setResolution] = useState([]);
    const [resolutionKey, setResolutionKey] = useState(null);

    const [hlsPlayer, setHlsPlayer] = useState({ nextLevel: null });

    useEffect(() => {
        if (contactState.ready) {
            const hlsPlayer = playerRef.current.getInternalPlayer('hls');
            setHlsPlayer(hlsPlayer);
            const tempResolution = hlsPlayer.levels.toReversed().map((item, index) => ({
                icon: hlsPlayer.currentLevel == index ? <FontAwesomeIcon icon={faCheck} /> : null,
                title: item.height + 'p',
            }));
            tempResolution.push({
                icon: hlsPlayer.autoLevelEnabled ? <FontAwesomeIcon icon={faCheck} /> : null,
                title: `Tự động`,
            });
            if (hlsPlayer.autoLevelEnabled)
                dispatch(changeCurrentResolution(`Tự động (${hlsPlayer.levels[hlsPlayer.loadLevel].height}p)`));
            setResolutionKey('setResolution');
            setResolution(tempResolution);
        }
    }, [contactState.ready]);

    useEffect(() => {
        if (contactState.ready && hlsPlayer.autoLevelEnabled) {
            dispatch(changeCurrentResolution(`Tự động (${hlsPlayer.levels[hlsPlayer.nextLoadLevel].height}p)`));
        }
    }, [hlsPlayer.nextLevel]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            const currTime = playerRef.current.getCurrentTime();

            // If spacebar is pressed, toggle play/pause
            switch (e.keyCode) {
                case 32:
                    e.preventDefault();
                    handlePlayPause();
                    handleAnimBtnClick();
                    break;
                case 70:
                    handleClickFullscreen();
                    break;
                case 73:
                    handleTogglePIP();
                    break;
                case 37:
                case 74:
                    handleMouseMove();
                    handleAnimLeftBtnClick();
                    playerRef.current.seekTo(currTime - 5);
                    break;
                case 75:
                    handlePlayPause();
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
                    handleToggleMuted();
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

    const handleVolumeChange = useCallback((e) => {
        dispatch(changeVolume(e.target.value));
    }, []);

    const handleOnPlaybackRateChange = useCallback((value) => {
        dispatch(changePlaybackRate(value));
    }, []);

    const handleToggleMuted = useCallback(() => {
        dispatch(toggleMuted(!contactState.muted));
    }, [contactState.muted]);

    const handleSeekMouseDown = useCallback(() => {
        dispatch(grabSeek(true));
    }, []);

    const handleSeekChange = useCallback(
        (value) => {
            dispatch(changeSeek(value));
        },
        [contactState.seeking],
    );

    const handleSeekMouseUp = useCallback((e) => {
        dispatch(grabSeek(false));
        playerRef.current.seekTo(parseFloat(e.target.value));
    }, []);

    const handleSpeedSettingChange = (selectedSpeed) => {
        handleOnPlaybackRateChange(selectedSpeed.title);
        VIDEO_SPEED.forEach((menuItem) => {
            if (menuItem.title === selectedSpeed.title) menuItem.icon = <FontAwesomeIcon icon={faCheck} />;
            else menuItem.icon = null;
        });
        dispatch(changeCurrentSpeed(selectedSpeed.title));
    };

    const handleResolSettingChange = (selectedResol) => {
        resolution.forEach((menuItem, index) => {
            if (menuItem.title === selectedResol.title) {
                menuItem.icon = <FontAwesomeIcon icon={faCheck} />;
                if (index === resolution.length - 1) hlsPlayer.currentLevel = -1;
                else hlsPlayer.currentLevel = resolution.length - index - 2;
            } else menuItem.icon = null;
        });
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
        // setAnimRightBtnShow(true);

        x = setTimeout(function () {
            dispatch(showRightBtn(false));
            // setAnimRightBtnShow(false);
        }, 500);
    };
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
                    onChange={(e) => handleSeekChange(e.target.value)}
                    onMouseUp={(e) => handleSeekMouseUp(e)}
                    onTouchEnd={(e) => handleSeekMouseUp(e)}
                />
            </div>
            <div className={cx('btn-list')}>
                <div className={cx('left-btn-list')}>
                    <Tippy delay={[0, 50]} content="Tập trước" placement="top" arrow={false}>
                        <button className={cx('action-btn')}>
                            <FontAwesomeIcon icon={faBackwardStep} />
                        </button>
                    </Tippy>
                    <Tippy delay={[0, 50]} content="Phát (k)" placement="top" arrow={false}>
                        <button className={cx('action-btn')} onClick={handlePlayPause}>
                            {contactState.playing ? (
                                <FontAwesomeIcon icon={faPause} />
                            ) : (
                                <FontAwesomeIcon icon={faPlay} />
                            )}
                        </button>
                    </Tippy>
                    <Tippy delay={[0, 50]} content="Tập tiếp theo" placement="top" arrow={false}>
                        <button className={cx('action-btn')}>
                            <FontAwesomeIcon icon={faForwardStep} />
                        </button>
                    </Tippy>
                    <Tippy
                        delay={[0, 50]}
                        content={contactState.muted ? 'Bật âm thanh (m)' : 'Tắt tiếng (m)'}
                        placement="top"
                        arrow={false}
                    >
                        <button className={cx('action-btn', 'vol-btn')} onClick={handleToggleMuted}>
                            {contactState.muted ? (
                                <FontAwesomeIcon icon={faVolumeMute} />
                            ) : (
                                <FontAwesomeIcon icon={faVolumeHigh} />
                            )}
                        </button>
                    </Tippy>
                    <Tippy delay={[0, 50]} content="Âm lượng" placement="top" arrow={false}>
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
                    </Tippy>
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
                        <button className={cx('action-btn', 'action2-btn')}>x {contactState.currSpeed}</button>
                    </Menu>
                    <Menu
                        key={resolutionKey}
                        playerMenu
                        items={resolution}
                        title="Chất lượng"
                        placement="top"
                        delay={0}
                        onChange={handleResolSettingChange}
                    >
                        <button className={cx('action-btn', 'action2-btn')}>{contactState.currResol}</button>
                    </Menu>
                    <Tippy delay={[0, 50]} content="Trình phát thu nhỏ (i)" placement="top" arrow={false}>
                        {ReactPlayer.canEnablePIP(contactState.url) && (
                            <button className={cx('action-btn')} onClick={handleTogglePIP}>
                                <FontAwesomeIcon icon={faWindowRestore} />
                            </button>
                        )}
                    </Tippy>
                    <Tippy delay={[0, 50]} content="Toàn màn hình (f)" placement="top" arrow={false}>
                        <button className={cx('action-btn')} onClick={handleClickFullscreen}>
                            <FontAwesomeIcon icon={faExpand} />
                        </button>
                    </Tippy>
                </div>
            </div>
        </div>
    );
});

Contact.propTypes = {
    // handleSeekMouseDown: PropTypes.func.isRequired,
    // handleSeekMouseUp: PropTypes.func.isRequired,
    // handleSeekChange: PropTypes.func.isRequired,
    playerRef: PropTypes.node.isRequired,
    handlePlayPause: PropTypes.func.isRequired,
    handleClickFullscreen: PropTypes.func.isRequired,
    handleMouseMove: PropTypes.func.isRequired,
    // handleToggleMuted: PropTypes.func.isRequired,
    // handleVolumeChange: PropTypes.func.isRequired,
    // handleOnPlaybackRateChange: PropTypes.func.isRequired,
    // handleTogglePIP: PropTypes.func.isRequired,
};

export default Contact;
