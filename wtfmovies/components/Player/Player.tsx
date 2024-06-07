'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ReactPlayer from 'react-player';

import screenfull from 'screenfull';
import classNames from 'classnames/bind';
import Hls, { LoaderCallbacks, LoaderContext } from 'hls.js';
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
    changeVolume,
} from './playerSlice';
import { playerSelector } from '~/redux/selectors';
import Contact from './Contact';
import Cover from './Cover';
import MobileContact from './MobileContact';
import MobileCover from './MobileCover';
import { useViewport } from '~/hooks';

const cx = classNames.bind(style);

const Player = ({
    url,
    numEp,
    maxEp,
    className,
    isEdior,
}: {
    url: string;
    numEp: number;
    maxEp: number;
    className?: any;
    isEdior?: boolean;
}) => {
    let i: NodeJS.Timeout;
    const classes = cx('wrapper', {
        [className]: className,
    });
    // redux
    const router = useRouter();
    const pathname = usePathname();

    const state = useSelector(playerSelector);
    const dispatch = useDispatch();

    // Ref hooks
    const playerRef = useRef<any>(null);
    const wrapperRef = useRef<Element | any>(undefined);
    const contactRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    useEffect(() => {
        dispatch(changeUrl(url));
    }, [state.url]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handlePlayPause = useCallback(
        (e: any) => {
            e.preventDefault();

            dispatch(changePlayPause(!state.playing));
            handleMouseMove();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [state.playing],
    );

    const handleReady = () => {
        dispatch(changeReady(true));
    };

    const handleEnablePIP = useCallback(() => console.log('onEnablePIP'), []);

    const handleDisablePIP = useCallback(() => dispatch(togglePIP(false)), []);

    const handlePause = useCallback(() => console.log('onPause'), []);

    const handleProgress: any = useCallback(
        (progress: number) => {
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

    const handleDuration = useCallback((duration: number) => {
        dispatch(changeDuration(duration));
    }, []);

    const handleClickFullscreen = useCallback((e: any) => {
        e.preventDefault();
        dispatch(togglePIP(false));

        return screenfull.toggle(wrapperRef.current);
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

    const handleNextEp = () => {
        dispatch(changeReady(false));

        if (numEp < maxEp) router.push(pathname.replace(/tap.*/g, `tap${numEp + 1}`), { scroll: true });
    };

    const handlePrevEp = () => {
        dispatch(changeReady(false));

        if (numEp > 1) router.push(pathname.replace(/tap.*/g, `tap${numEp - 1}`), { scroll: true });
    };

    if (isClient)
        return (
            <div ref={wrapperRef} className={classes}>
                <ReactPlayer
                    ref={playerRef}
                    className={cx('react-player')}
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
                    onStart={() => dispatch(changePlayPause(true))}
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
                    onPlaybackQualityChange={(e: any) => console.log('onPlaybackQualityChange', e)}
                    config={{
                        file: {
                            forceHLS: true,
                            hlsOptions: {
                                // autoStartLoad: true,
                                // additional hls.js options
                                pLoader: function (config: any) {
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
                                    this.load = (
                                        context: any,
                                        config: any,
                                        callbacks: LoaderCallbacks<LoaderContext>,
                                    ) => {
                                        let onSuccess: any = callbacks.onSuccess;
                                        callbacks.onSuccess = function (response: any, stats, context) {
                                            response.data = response.data.slice(response.data.indexOf('#EXTM3U'));

                                            onSuccess(response, stats, context);
                                        };

                                        loader.load(context, config, callbacks);
                                    };
                                },
                            },

                            hlsVersion: 'latest', // use the version you prefer
                        },
                        youtube: {
                            playerVars: { showinfo: 0, autoplay: 1 },
                        },
                    }}
                />

                {!isMobile ? (
                    <>
                        <Contact
                            ref={contactRef}
                            playerRef={playerRef}
                            isEdior={isEdior}
                            handlePlayPause={handlePlayPause}
                            handleClickFullscreen={handleClickFullscreen}
                            handleMouseMove={handleMouseMove}
                            handleNextEp={handleNextEp}
                            handlePrevEp={handlePrevEp}
                        />
                        <Cover
                            handleMouseMove={handleMouseMove}
                            handlePlayPause={handlePlayPause}
                            handleClickFullscreen={handleClickFullscreen}
                        />
                    </>
                ) : (
                    <>
                        <MobileContact
                            ref={contactRef}
                            playerRef={playerRef}
                            isEdior={isEdior}
                            handlePlayPause={handlePlayPause}
                            handleClickFullscreen={handleClickFullscreen}
                            handleMouseMove={handleMouseMove}
                        />
                        <MobileCover
                            playerRef={playerRef}
                            handlePlayPause={handlePlayPause}
                            handleNextEp={handleNextEp}
                            handlePrevEp={handlePrevEp}
                        />
                    </>
                )}
            </div>
        );
    else return <div className={classes}>Loading Player</div>;
};

export default Player;
