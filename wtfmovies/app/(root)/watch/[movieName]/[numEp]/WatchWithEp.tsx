'use client';
import FilmInteract from '~/components/FilmInteract';
import Player from '~/components/Player';

import classNames from 'classnames/bind';
import style from './Watch.module.scss';
import { changeEpisode } from './watchSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);

export function WatchWithEp({ filmEpisode, numEp }: { filmEpisode: any; numEp: number }) {
    const dispatch = useDispatch();
    const [serverVideo, setServerVideo] = useState<string>(filmEpisode[numEp - 1].link.Tiktok ? 'Tiktok' : 'Youtube');
    const [linkVideo, setLinkVideo] = useState<string>(
        serverVideo === 'Tiktok' ? filmEpisode[numEp - 1].link.Tiktok + '?.m3u8' : filmEpisode[numEp - 1].link.Youtube,
    );

    useEffect(() => {
        setLinkVideo(
            serverVideo === 'Tiktok'
                ? filmEpisode[numEp - 1].link.Tiktok + '?.m3u8'
                : filmEpisode[numEp - 1].link.Youtube,
        );
    }, [serverVideo]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            await fetch('/api/v1/updateView', {
                method: 'POST',
                body: JSON.stringify({ epId: filmEpisode[numEp - 1]._id }),
            });
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);
    useEffect(() => {
        dispatch(changeEpisode(filmEpisode[numEp - 1]));
    }, [filmEpisode[numEp - 1]]);

    return (
        <div className={cx('wrapper')}>
            <Player key={numEp + 'video'} url={linkVideo} numEp={numEp} maxEp={filmEpisode.length} />
            <FilmInteract
                serverVideo={serverVideo}
                setServerVideo={setServerVideo}
                data={filmEpisode[numEp - 1].link}
            />
        </div>
    );
}
