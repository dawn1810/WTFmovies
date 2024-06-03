'use client';
import FilmInteract from '~/components/FilmInteract';
import Player from '~/components/Player';

import classNames from 'classnames/bind';
import style from './Watch.module.scss';
import { changeEpisode } from './watchSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const cx = classNames.bind(style);

export function WatchWithEp({ filmEpisode, numEp }: { filmEpisode: any; numEp: number }) {
    const dispatch = useDispatch();
    useEffect(() => {
        const timer = setTimeout(async () => {
            await fetch('/api/v1/updateView', {
                method: 'POST',
                body: JSON.stringify({ epId: filmEpisode[numEp - 1]._id })
            });
            console.log('update view');
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
            <Player key={numEp + 'video'} url={`${filmEpisode[numEp - 1].link}?.m3u8`} />
            <FilmInteract />
        </div>
    );
}
