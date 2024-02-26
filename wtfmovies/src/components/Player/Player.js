import { useCallback, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import classNames from 'classnames/bind';

import style from './Player.module.scss';

const cx = classNames.bind(style);

function Player() {
    const playerRef = useRef(null);
    const urlInputRef = useRef(null);

    const [state, setState] = useState({
        url: null,
        pip: false,
        playing: true,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
    });

    const load = useCallback((url) => {
        setState((prevState) => ({
            ...prevState,
            url,
            played: 0,
            loaded: 0,
            pip: false,
        }));
    }, []);

    const renderLoadButton = (url, label) => {
        return <button onClick={() => load(url)}>{label}</button>;
    };

    renderLoadButton(
        'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        'HLS (m3u8)',
    );

    const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = state;

    const SEPARATOR = ' · ';

    console.log(url);
    return (
        <ReactPlayer
            ref={playerRef}
            className="react-player"
            width="100%"
            height="100%"
            url={url}
            pip={pip}
            playing={playing}
            controls={controls}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
        />
    );
}

export default Player;
