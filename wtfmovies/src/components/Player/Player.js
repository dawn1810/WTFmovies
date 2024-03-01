// import ReactPlayer from 'react-player/lazy';

// const Player = ({ url }) => {
//     return (
//         <div className="player-wrapper">
//             <ReactPlayer
//                 url={url}
//                 width="1250px"
//                 height="690px"
//                 controls
//                 playing
//                 light={images.preload}
//                 // config={{
//                 //     file: {
//                 //         hlsOptions: {
//                 //             xhrSetup: function (xhr, url) {
//                 //                 // Đây là cấu hình cho các request HTTP khi tải file M3U8,
//                 //                 // bạn có thể sử dụng nó để cấu hình các header, ví dụ như để qua CORS
//                 //                 // xhr.withCredentials = true; // Đặt nếu server yêu cầu credentials
//                 //             },
//                 //         },
//                 //     },
//                 // }}
//             />
//         </div>
//     );
// };

// export default Player;
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBackwardStep,
    faCheck,
    faClock,
    faExpand,
    faForwardStep,
    faGear,
    faPause,
    faPlay,
    faSliders,
    faVolumeHigh,
    faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';
import { faCirclePlay, faWindowRestore } from '@fortawesome/free-regular-svg-icons';
import { useState, useRef, useCallback, useEffect } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import classNames from 'classnames/bind';

import Duration from './Duration';
import images from '~/assets/image';
import style from './Player.module.scss';
import Menu from '../Popper/Menu';

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

const RESOL_SPEED = [
    {
        icon: null,
        title: '4K - VIP',
    },
    {
        icon: null,
        title: '2K - VIP',
    },
    {
        icon: null,
        title: '1080p (HD)',
    },
    {
        icon: <FontAwesomeIcon icon={faCheck} />,
        title: '720p',
    },
    {
        icon: null,
        title: '480p',
    },
    {
        icon: null,
        title: '360p',
    },
    {
        icon: null,
        title: '240p',
    },
    {
        icon: null,
        title: '144p',
    },
];

const Player = () => {
    let i;
    let y;

    // State hooks
    const [state, setState] = useState({
        url: 'https://rurimeiko.pages.dev/demo3.m3u8',
        pip: false,
        playing: false,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
        seeking: false,
        loading: false,
    });
    const [contactShow, setContactShow] = useState(false);
    const [animBtnShow, setAnimBtnShow] = useState(false);
    const [currSpeed, setCurrSpeed] = useState('1');
    const [currResol, setCurrResol] = useState('1080 (HD)');

    useEffect(() => {
        const handleKeyPress = (e) => {
            // If spacebar is pressed, toggle play/pause
            switch (e.keyCode) {
                case 32:
                    e.preventDefault();
                    handlePlayPause();
                    break;
                case 75:
                    handlePlayPause();
                    break;
                case 77:
                    handleToggleMuted();
                    handleMouseMove();
                    break;
                case 73:
                    handleTogglePIP();
                    break;
                case 70:
                    handleClickFullscreen();
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
    }, [state.playing]);

    // Ref hooks
    const playerRef = useRef(null);
    const wrapperRef = useRef(null);
    const contactRef = useRef(null);

    // Callback hooks
    const load = useCallback((url) => {
        setState((state) => ({ ...state, url, played: 0, loaded: 0, pip: false }));
    }, []);

    const handlePlayPause = useCallback(() => {
        setState((state) => ({ ...state, playing: !state.playing }));
        handleMouseMove();
        handleAnimBtnClick();
    }, []);

    const handleStop = useCallback(() => {
        setState((state) => ({ ...state, url: null, playing: false }));
    }, []);

    const handleToggleControls = useCallback(() => {
        const url = state.url;
        setState(
            (state) => ({ ...state, controls: !state.controls, url: null }),
            () => load(url),
        );
    }, [state.url, load]);

    const handleToggleLight = useCallback((e) => {
        setState((state) => ({ ...state, light: !state.light }));
    }, []);

    const handleToggleLoop = useCallback((e) => {
        setState((state) => ({ ...state, loop: !state.loop }));
    }, []);

    const handleVolumeChange = useCallback((e) => {
        setState((state) => ({ ...state, volume: parseFloat(e.target.value), muted: false }));
    }, []);

    const handleToggleMuted = useCallback(() => {
        setState((state) => ({ ...state, muted: !state.muted }));
    }, []);

    const handleSetPlaybackRate = useCallback((value) => {
        setState((state) => ({ ...state, playbackRate: parseFloat(value) }));
    }, []);

    const handleOnPlaybackRateChange = useCallback((value) => {
        setState((state) => ({ ...state, playbackRate: parseFloat(value) }));
    }, []);

    const handleTogglePIP = useCallback(() => {
        setState((state) => ({ ...state, pip: !state.pip }));
    }, []);

    const handleEnablePIP = useCallback(() => console.log('onEnablePIP'), []);

    const handleDisablePIP = useCallback(() => console.log('onDisablePIP'), []);

    const handlePause = useCallback(() => console.log('onPause'), []);

    const handleSeekMouseDown = useCallback(() => {
        setState((state) => ({ ...state, seeking: true }));
    }, []);

    const handleSeekChange = useCallback((e) => {
        setState((state) => ({ ...state, played: parseFloat(e.target.value) }));
    }, []);

    const handleSeekMouseUp = useCallback((e) => {
        setState((state) => ({ ...state, seeking: false }));
        playerRef.current.seekTo(parseFloat(e.target.value));
    }, []);

    const handleProgress = useCallback(
        (progress) => {
            if (!state.seeking) {
                setState((state) => ({ ...state, ...progress }));
            }
        },
        [state.seeking],
    );

    const handleEnded = useCallback(() => {
        setState((state) => ({ ...state, playing: state.loop }));
    }, []);

    const handleDuration = useCallback((duration) => {
        setState((state) => ({ ...state, duration }));
    }, []);

    const handleClickFullscreen = useCallback(() => {
        screenfull.toggle(wrapperRef.current);
    }, []);

    const handleOnBuffer = () => {
        setState((state) => ({ ...state, loading: true }));
    };

    const handlePlay = () => {
        console.log('onPlay');
        setState((state) => ({ ...state, loading: false }));
    };

    const handleMouseMove = () => {
        clearTimeout(i);
        setContactShow(true);

        i = setTimeout(function () {
            setContactShow(false);
        }, 3000);
    };

    const handleAnimBtnClick = () => {
        clearTimeout(y);
        setAnimBtnShow(true);

        y = setTimeout(function () {
            setAnimBtnShow(false);
        }, 500);
    };

    const handleSpeedSettingChange = (selectedSpeed) => {
        handleOnPlaybackRateChange(selectedSpeed.title);
        VIDEO_SPEED.forEach((menuItem) => {
            if (menuItem.title === selectedSpeed.title) menuItem.icon = <FontAwesomeIcon icon={faCheck} />;
            else menuItem.icon = null;
        });
        setCurrSpeed(selectedSpeed.title);
    };

    const handleResolSettingChange = (selectedResol) => {
        // handleOnPlaybackRateChange(selectedResol.title);
        RESOL_SPEED.forEach((menuItem) => {
            if (menuItem.title === selectedResol.title) menuItem.icon = <FontAwesomeIcon icon={faCheck} />;
            else menuItem.icon = null;
        });
        setCurrResol(selectedResol.title);
    };

    const renderLoadButton = useCallback(
        (url, label) => {
            return <button onClick={() => load(url)}>{label}</button>;
        },
        [load],
    );

    // const SEPARATOR = ' · ';

    return (
        <div ref={wrapperRef} className={cx('wrapper')}>
            <ReactPlayer
                ref={playerRef}
                className="react-player"
                width="100%"
                height="100%"
                url={state.url}
                pip={state.pip}
                playing={state.playing}
                controls={false}
                light={state.light}
                loop={state.loop}
                playbackRate={state.playbackRate}
                volume={state.volume}
                muted={state.muted}
                onReady={() => console.log('onStart')}
                onStart={() => console.log('onStart')}
                onPlay={handlePlay}
                // onProgress
                onBuffer={handleOnBuffer}
                onBufferEnd={handlePlay}
                onEnablePIP={handleEnablePIP}
                onDisablePIP={handleDisablePIP}
                onPause={handlePause}
                onPlaybackRateChange={handleOnPlaybackRateChange}
                onSeek={(e) => console.log('onSeek', e)}
                onEnded={handleEnded}
                onError={(e) => console.log('onError', e)}
                onProgress={handleProgress}
                onDuration={handleDuration}
                onPlaybackQualityChange={(e) => console.log('onPlaybackQualityChange', e)}
                config={{
                    file: {
                        hlsOptions: {
                            autoStartLoad: true,
                            // additional hls.js options
                        },
                        hlsVersion: '0.14.16', // use the version you prefer
                    },
                }}
            />
            <div ref={contactRef} className={cx('player-contact-wrapper', { 'contact-show': contactShow })}>
                <div className={cx('progress-bar')}>
                    <progress max={1} value={state.loaded} className={cx('loaded-bar')} />
                    <progress max={1} value={state.played} className={cx('played-bar')} />
                    <input
                        type="range"
                        min={0}
                        max={0.999999}
                        step="any"
                        value={state.played}
                        className={cx('seek-bar')}
                        onMouseDown={handleSeekMouseDown}
                        onChange={(e) => handleSeekChange(e)}
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
                                {state.playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                            </button>
                        </Tippy>
                        <Tippy delay={[0, 50]} content="Tập tiếp theo" placement="top" arrow={false}>
                            <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faForwardStep} />
                            </button>
                        </Tippy>
                        <Tippy
                            delay={[0, 50]}
                            content={state.muted ? 'Bật âm thanh (m)' : 'Tắt tiếng (m)'}
                            placement="top"
                            arrow={false}
                        >
                            <button className={cx('action-btn', 'vol-btn')} onClick={handleToggleMuted}>
                                {state.muted ? (
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
                                    value={state.volume}
                                    className={cx('volumn-input')}
                                    onChange={(e) => handleVolumeChange(e)}
                                />
                            </div>
                        </Tippy>
                        <div className={cx('duration')}>
                            <Duration seconds={state.duration * state.played} /> / <Duration seconds={state.duration} />
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
                            <button className={cx('action-btn', 'action2-btn')}>x {currSpeed}</button>
                        </Menu>
                        <Menu
                            playerMenu
                            items={RESOL_SPEED}
                            title="Chất lượng"
                            placement="top"
                            delay={0}
                            onChange={handleResolSettingChange}
                        >
                            <button className={cx('action-btn', 'action2-btn')}>{currResol}</button>
                        </Menu>
                        <Tippy delay={[0, 50]} content="Trình phát thu nhỏ (i)" placement="top" arrow={false}>
                            {ReactPlayer.canEnablePIP(state.url) && (
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
            <div
                className={cx('player-cover')}
                onMouseMove={handleMouseMove}
                onClick={handlePlayPause}
                onDoubleClick={handleClickFullscreen}
            >
                <div
                    className={cx('center-btn', {
                        'loading-btn': state.loading,
                    })}
                >
                    <img className={cx('loading-img')} src={images.logo} alt="" />
                </div>
                <div
                    className={cx('center-btn', {
                        'animation-btn': animBtnShow,
                    })}
                >
                    {state.playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                </div>
            </div>

            {/* <table>
                <tbody>
                    <tr>
                        <th>Controls</th>
                        <td>
                            <button onClick={handleStop}>Stop</button>
                            <button onClick={handlePlayPause}>{state.playing ? 'Pause' : 'Play'}</button>
                            <button onClick={handleClickFullscreen}>Fullscreen</button>
                            {state.light && (
                                <button onClick={() => playerRef.current.showPreview()}>Show preview</button>
                            )}
                            {ReactPlayer.canEnablePIP(state.url) && (
                                <button onClick={handleTogglePIP}>{state.pip ? 'Disable PiP' : 'Enable PiP'}</button>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Speed</th>
                        <td>
                            <button onClick={(e) => handleSetPlaybackRate(e)} value={1}>
                                1x
                            </button>
                            <button onClick={(e) => handleSetPlaybackRate(e)} value={1.5}>
                                1.5x
                            </button>
                            <button onClick={(e) => handleSetPlaybackRate(e)} value={2}>
                                2x
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th>Seek</th>
                        <td>
                            <input
                                type="range"
                                min={0}
                                max={0.999999}
                                step="any"
                                value={state.played}
                                onMouseDown={handleSeekMouseDown}
                                onChange={(e) => handleSeekChange(e)}
                                onMouseUp={(e) => handleSeekMouseUp(e)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Volume</th>
                        <td>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step="any"
                                value={state.volume}
                                onChange={(e) => handleVolumeChange(e)}
                            />
                        </td>
                    </tr>
                    <tr>
                            <th>
                                <label htmlFor="controls">Controls</label>
                            </th>
                            <td>
                                <input
                                    id="controls"
                                    type="checkbox"
                                    checked={state.controls}
                                    onChange={handleToggleControls}
                                />
                                <em>&nbsp; Requires player reload</em>
                            </td>
                        </tr>
                    <tr>
                        <th>
                            <label htmlFor="muted">Muted</label>
                        </th>
                        <td>
                            <input id="muted" type="checkbox" checked={state.muted} onChange={handleToggleMuted} />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label htmlFor="loop">Loop</label>
                        </th>
                        <td>
                            <input
                                id="loop"
                                type="checkbox"
                                checked={state.loop}
                                onChange={(e) => handleToggleLoop(e)}
                            />
                        </td>
                    </tr>
                    <tr>
                            <th>
                                <label htmlFor="light">Light mode</label>
                            </th>
                            <td>
                                <input
                                    id="light"
                                    type="checkbox"
                                    checked={state.light}
                                    onChange={(e) => handleToggleLight(e)}
                                />
                            </td>
                        </tr>
                    <tr>
                        <th>Played</th>
                        <td>
                            <progress max={1} value={state.played} />
                        </td>
                    </tr>
                    <tr>
                        <th>Loaded</th>
                        <td>
                            <progress max={1} value={state.loaded} />
                        </td>
                    </tr>
                </tbody>
            </table> */}
            {/* </section> */}
            {/* <section className="section">
                <table>
                    <tbody>
                        <tr>
                            <th>YouTube</th>
                            <td>
                                {renderLoadButton('https://www.youtube.com/watch?v=oUFJJNQGwhk', 'Test A')}
                                {renderLoadButton('https://www.youtube.com/watch?v=jNgP6d9HraI', 'Test B')}
                                {renderLoadButton(
                                    'https://www.youtube.com/playlist?list=PLogRWNZ498ETeQNYrOlqikEML3bKJcdcx',
                                    'Playlist',
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>SoundCloud</th>
                            <td>
                                {renderLoadButton('https://soundcloud.com/miami-nights-1984/accelerated', 'Test A')}
                                {renderLoadButton('https://soundcloud.com/tycho/tycho-awake', 'Test B')}
                                {renderLoadButton('https://soundcloud.com/yunghog/sets/doperaptraxxx', 'Playlist')}
                            </td>
                        </tr>
                        <tr>
                            <th>Facebook</th>
                            <td>
                                {renderLoadButton(
                                    'https://www.facebook.com/facebook/videos/10153231379946729/',
                                    'Test A',
                                )}
                                {renderLoadButton(
                                    'https://www.facebook.com/FacebookDevelopers/videos/10152454700553553/',
                                    'Test B',
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Vimeo</th>
                            <td>
                                {renderLoadButton('https://vimeo.com/90509568', 'Test A')}
                                {renderLoadButton('https://vimeo.com/169599296', 'Test B')}
                            </td>
                        </tr>
                        <tr>
                            <th>Twitch</th>
                            <td>
                                {renderLoadButton('https://www.twitch.tv/videos/106400740', 'Test A')}
                                {renderLoadButton('https://www.twitch.tv/videos/12783852', 'Test B')}
                                {renderLoadButton('https://www.twitch.tv/kronovi', 'Test C')}
                            </td>
                        </tr>
                        <tr>
                            <th>Streamable</th>
                            <td>
                                {renderLoadButton('https://streamable.com/moo', 'Test A')}
                                {renderLoadButton('https://streamable.com/ifjh', 'Test B')}
                            </td>
                        </tr>
                        <tr>
                            <th>Wistia</th>
                            <td>
                                {renderLoadButton('https://home.wistia.com/medias/e4a27b971d', 'Test A')}
                                {renderLoadButton('https://home.wistia.com/medias/29b0fbf547', 'Test B')}
                                {renderLoadButton('https://home.wistia.com/medias/bq6epni33s', 'Test C')}
                            </td>
                        </tr>
                        <tr>
                            <th>DailyMotion</th>
                            <td>
                                {renderLoadButton('https://www.dailymotion.com/video/x5e9eog', 'Test A')}
                                {renderLoadButton('https://www.dailymotion.com/video/x61xx3z', 'Test B')}
                            </td>
                        </tr>
                        <tr>
                            <th>Mixcloud</th>
                            <td>
                                {renderLoadButton('https://www.mixcloud.com/mixcloud/meet-the-curators/', 'Test A')}
                                {renderLoadButton(
                                    'https://www.mixcloud.com/mixcloud/mixcloud-curates-4-mary-anne-hobbs-in-conversation-with-dan-deacon/',
                                    'Test B',
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Vidyard</th>
                            <td>
                                {renderLoadButton('https://video.vidyard.com/watch/YBvcF2BEfvKdowmfrRwk57', 'Test A')}
                                {renderLoadButton('https://video.vidyard.com/watch/BLXgYCDGfwU62vdMWybNVJ', 'Test B')}
                            </td>
                        </tr>
                        <tr>
                            <th>Kaltura</th>
                            <td>
                                {renderLoadButton(
                                    'https://cdnapisec.kaltura.com/p/2507381/sp/250738100/embedIframeJs/uiconf_id/44372392/partner_id/2507381?iframeembed=true&playerId=kaltura_player_1605622074&entry_id=1_jz404fbl',
                                    'Test A',
                                )}
                                {renderLoadButton(
                                    'https://cdnapisec.kaltura.com/p/2507381/sp/250738100/embedIframeJs/uiconf_id/44372392/partner_id/2507381?iframeembed=true&playerId=kaltura_player_1605622336&entry_id=1_i1jmzcn3',
                                    'Test B',
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Files</th>
                            <td>
                                {renderLoadButton(
                                    'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
                                    'mp4',
                                )}
                                {renderLoadButton(
                                    'https://test-videos.co.uk/vids/bigbuckbunny/webm/vp8/360/Big_Buck_Bunny_360_10s_1MB.webm',
                                    'webm',
                                )}
                                {renderLoadButton(
                                    'https://filesamples.com/samples/video/ogv/sample_640x360.ogv',
                                    'ogv',
                                )}
                                {renderLoadButton(
                                    'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
                                    'mp3',
                                )}
                                <br />
                                {currentsetState((state) => ({ ...state, seeking: false }));renderLoadButton(
                                    'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
                                    'HLS (m3u8)',
                                )}
                                {renderLoadButton(
                                    'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps_640x360_800k.mpd',
                                    'DASH (mpd)',
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Custom URL</th>
                            <td>
                                <input ref={urlInputRef} type="text" placeholder="Enter URL" />
                                <button
                                    onClick={() => setState((state) => ({ ...state, url: urlInputRef.current.value }))}
                                >
                                    Load
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h2>State</h2>

                <table>
                    <tbody>
                        <tr>
                            <th>url</th>
                            <td className={!state.url ? 'faded' : ''}>
                                {(state.url instanceof Array ? 'Multiple' : state.url) || 'null'}
                            </td>
                        </tr>
                        <tr>
                            <th>playing</th>
                            <td>{state.playing ? 'true' : 'false'}</td>
                        </tr>
                        <tr>
                            <th>volume</th>
                            <td>{state.volume.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <th>speed</th>
                            <td>{state.playbackRate}</td>
                        </tr>
                        <tr>
                            <th>played</th>
                            <td>{state.played.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <th>loaded</th>
                            <td>{state.loaded.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <th>duration</th>
                            <td>
                                <Duration seconds={state.duration} />
                            </td>
                        </tr>
                        <tr>
                            <th>elapsed</th>
                            <td>
                                <Duration seconds={state.duration * state.played} />
                            </td>
                        </tr>
                        <tr>
                            <th>remaining</th>
                            <td>
                                <Duration seconds={state.duration * (1 - state.played)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section> */}
        </div>
    );
};

export default Player;
