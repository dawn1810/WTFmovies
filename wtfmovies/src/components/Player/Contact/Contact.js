import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
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

import style from './Contact.module.scss';
import Duration from '../Duration';
import Menu from '~/components/Popper/Menu';
import ReactPlayer from 'react-player';

const cx = classNames.bind(style);

const Contact = forwardRef(
    (
        {
            url,
            loaded,
            played,
            playing,
            muted,
            volume,
            duration,
            videoSpeeds,
            resolutions,
            contactShow,
            handleSeekMouseDown,
            handleSeekMouseUp,
            handleSeekChange,
            handlePlayPause,
            handleToggleMuted,
            handleVolumeChange,
            handleOnPlaybackRateChange,
            handleTogglePIP,
            handleClickFullscreen,
        },
        ref,
    ) => {
        const [currSpeed, setCurrSpeed] = useState('1');
        const [currResol, setCurrResol] = useState('1080 (HD)');

        const handleSpeedSettingChange = (selectedSpeed) => {
            handleOnPlaybackRateChange(selectedSpeed.title);
            videoSpeeds.forEach((menuItem) => {
                if (menuItem.title === selectedSpeed.title) menuItem.icon = <FontAwesomeIcon icon={faCheck} />;
                else menuItem.icon = null;
            });
            setCurrSpeed(selectedSpeed.title);
        };

        const handleResolSettingChange = (selectedResol) => {
            // handleOnPlaybackRateChange(selectedResol.title);
            resolutions.forEach((menuItem) => {
                if (menuItem.title === selectedResol.title) menuItem.icon = <FontAwesomeIcon icon={faCheck} />;
                else menuItem.icon = null;
            });
            setCurrResol(selectedResol.title);
        };

        return (
            <div ref={ref} className={cx('player-contact-wrapper', { 'contact-show': contactShow })}>
                <div className={cx('progress-bar')}>
                    <progress max={1} value={loaded} className={cx('loaded-bar')} />
                    <progress max={1} value={played} className={cx('played-bar')} />
                    <input
                        type="range"
                        min={0}
                        max={0.999999}
                        step="any"
                        value={played}
                        className={cx('seek-bar')}
                        onMouseDown={handleSeekMouseDown}
                        onChange={(e) => handleSeekChange(e.target.value)}
                        onMouseUp={(e) => handleSeekMouseUp(e)}
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
                                {playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                            </button>
                        </Tippy>
                        <Tippy delay={[0, 50]} content="Tập tiếp theo" placement="top" arrow={false}>
                            <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faForwardStep} />
                            </button>
                        </Tippy>
                        <Tippy
                            delay={[0, 50]}
                            content={muted ? 'Bật âm thanh (m)' : 'Tắt tiếng (m)'}
                            placement="top"
                            arrow={false}
                        >
                            <button className={cx('action-btn', 'vol-btn')} onClick={handleToggleMuted}>
                                {muted ? (
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
                                    value={volume}
                                    className={cx('volumn-input')}
                                    onChange={(e) => handleVolumeChange(e)}
                                />
                            </div>
                        </Tippy>
                        <div className={cx('duration')}>
                            <Duration seconds={duration * played} /> / <Duration seconds={duration} />
                        </div>
                    </div>
                    <div className={cx('right-btn-list')}>
                        <Menu
                            playerMenu
                            items={videoSpeeds}
                            title="Tốc độ phát"
                            placement="top"
                            delay={0}
                            onChange={handleSpeedSettingChange}
                        >
                            <button className={cx('action-btn', 'action2-btn')}>x {currSpeed}</button>
                        </Menu>
                        <Menu
                            playerMenu
                            items={resolutions}
                            title="Chất lượng"
                            placement="top"
                            delay={0}
                            onChange={handleResolSettingChange}
                        >
                            <button className={cx('action-btn', 'action2-btn')}>{currResol}</button>
                        </Menu>
                        <Tippy delay={[0, 50]} content="Trình phát thu nhỏ (i)" placement="top" arrow={false}>
                            {ReactPlayer.canEnablePIP(url) && (
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
    },
);

Contact.propTypes = {
    url: PropTypes.string.isRequired,
    loaded: PropTypes.number.isRequired,
    played: PropTypes.number.isRequired,
    playing: PropTypes.bool.isRequired,
    muted: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    videoSpeeds: PropTypes.array.isRequired,
    resolutions: PropTypes.array.isRequired,
    contactShow: PropTypes.bool.isRequired,
    handleSeekMouseDown: PropTypes.func.isRequired,
    handleSeekMouseUp: PropTypes.func.isRequired,
    handleSeekChange: PropTypes.func.isRequired,
    handlePlayPause: PropTypes.func.isRequired,
    handleToggleMuted: PropTypes.func.isRequired,
    handleVolumeChange: PropTypes.func.isRequired,
    handleOnPlaybackRateChange: PropTypes.func.isRequired,
    handleTogglePIP: PropTypes.func.isRequired,
    handleClickFullscreen: PropTypes.func.isRequired,
};

export default Contact;
