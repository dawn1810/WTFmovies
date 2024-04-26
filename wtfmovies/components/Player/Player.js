'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useCallback, useEffect } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import classNames from 'classnames/bind';

import style from './Player.module.scss';
import {
    changeReady,
    changePlayPause,
    togglePIP,
    changeProgress,
    changeDuration,
    changeLoading,
    showContact,
    changeUrl,
} from './playerSlice';
import { playerSelector } from '~/redux/selectors';
import Contact from './Contact';
import Cover from './Cover';

const cx = classNames.bind(style);

const Player = ({ url }) => {
    let i;

    // redux
    const state = useSelector(playerSelector);
    const dispatch = useDispatch();

    // Ref hooks
    const playerRef = useRef(null);
    const wrapperRef = useRef(null);
    const contactRef = useRef(null);
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        dispatch(changeUrl(url));
    }, [state.url]);


    useEffect(() => {
        setIsClient(true)
    }, []);

    const handlePlayPause = useCallback(() => {
        dispatch(changePlayPause(!state.playing));
        handleMouseMove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.playing]);

    const handleReady = () => {
        dispatch(changeReady(true));
    };

    const handleEnablePIP = useCallback(() => console.log('onEnablePIP'), []);

    const handleDisablePIP = useCallback(() => dispatch(togglePIP(false)), []);

    const handlePause = useCallback(() => console.log('onPause'), []);


    const handleProgress = useCallback(
        (progress) => {
            if (!state.seeking) {
                dispatch(changeProgress(progress));
            }
        },
        [state.seeking],
        // [state.seeking, state],
    );

    const handleEnded = useCallback(() => {
        dispatch(changePlayPause(state.loop));
    }, []);

    const handleDuration = useCallback((duration) => {
        dispatch(changeDuration(duration));
    }, []);

    const handleClickFullscreen = useCallback(() => {
        screenfull.toggle(wrapperRef.current);
    }, []);

    const handleOnBuffer = () => {
        dispatch(changeLoading(true));
    };

    const handlePlay = () => {
        dispatch(changeLoading(false));
    };

    const handleMouseMove = () => {
        clearTimeout(i);
        dispatch(showContact(true));

        i = setTimeout(function () {
            dispatch(showContact(false));
        }, 3000);
    };

    return (
        isClient ?
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
                    onReady={handleReady}
                    onStart={() => console.log('start')}
                    onPlay={handlePlay}
                    // onProgress
                    onBuffer={handleOnBuffer}
                    onBufferEnd={handlePlay}
                    onEnablePIP={handleEnablePIP}
                    onDisablePIP={handleDisablePIP}
                    onPause={handlePause}
                    // onPlaybackRateChange={handleOnPlaybackRateChange}
                    onSeek={(e) => console.log('onSeek', e)}
                    onEnded={handleEnded}
                    onError={(e) => console.log('onError', e)}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                    onPlaybackQualityChange={(e) => console.log('onPlaybackQualityChange', e)}
                    config={{
                        file: {
                            // forceHLS: true,
                            hlsOptions: {
                                // autoStartLoad: true,
                                // additional hls.js options
                                pLoader: function (config) {
                                    let loader = new Hls.DefaultConfig.loader(config);
                                    Object.defineProperties(this, {
                                        stats: {
                                            get: () => loader.stats,
                                        },
                                        context: {
                                            get: () => loader.context,
                                        },
                                    });

                                    this.abort = () => loader.abort();
                                    this.destroy = () => loader.destroy();
                                    this.load = (context, config, callbacks) => {
                                        var onSuccess = callbacks.onSuccess;
                                        callbacks.onSuccess = function (response, stats, context) {

                                            response.data = response.data.slice(response.data.indexOf("#EXTM3U"));

                                            onSuccess(response, stats, context);
                                        };

                                        loader.load(context, config, callbacks);
                                    };
                                },
                            },



                            hlsVersion: 'latest', // use the version you prefer
                        },

                        youtube: {
                            playerVars: { showinfo: 1 }
                        },
                    }}
                />


                <Contact
                    ref={contactRef}
                    playerRef={playerRef}
                    handlePlayPause={handlePlayPause}
                    handleClickFullscreen={handleClickFullscreen}
                    handleMouseMove={handleMouseMove}
                />

                <Cover
                    handleMouseMove={handleMouseMove}
                    handlePlayPause={handlePlayPause}
                    handleClickFullscreen={handleClickFullscreen}
                />



            </div>
            : <div className={cx('wrapper')}>Loading Player</div>
    );
};


export default Player;
