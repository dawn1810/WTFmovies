'use client';
import FilmInteract from '~/components/FilmInteract';
import Player from '~/components/Player';

import classNames from 'classnames/bind';
import style from './Watch.module.scss';
import { changeEpisode } from './watchSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

// dialog
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/navigation';

const cx = classNames.bind(style);

function formatTime(seconds: number) {
    if (seconds < 60) {
        return `${seconds} giây`;
    } else {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        let result = `${minutes} phút`;
        if (remainingSeconds > 0) {
            result += ` ${remainingSeconds} giây`;
        }
        return result;
    }
}

export function WatchWithEp({
    film_id,
    filmEpisode,
    numEp,
    searchName,
}: {
    film_id: string;
    filmEpisode: any;
    numEp: number;
    searchName: string;
}) {
    const localStore = useRef(
        typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(film_id) || '{}') : {}
    );

    const dispatch = useDispatch();
    const [serverVideo, setServerVideo] = useState<string>(filmEpisode[numEp - 1].link.Tiktok ? 'Tiktok' : 'Youtube');
    const [linkVideo, setLinkVideo] = useState<string>(
        serverVideo === 'Tiktok' ? filmEpisode[numEp - 1].link.Tiktok + '?.m3u8' : filmEpisode[numEp - 1].link.Youtube,
    );

    const router = useRouter();
    // nguoi dung tung xem phim va chua hoi lan nao
    const [open, setOpen] = useState(
        (typeof window !== 'undefined') ? (!!localStore.current.curr && !sessionStorage.getItem(film_id)) : false);

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
                body: JSON.stringify({ epId: filmEpisode[numEp - 1]._id, film_id: film_id }),
            });
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        dispatch(changeEpisode(filmEpisode[numEp - 1]));
    }, [filmEpisode[numEp - 1]]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem(film_id, '1'); // to know user used to answer this film
        }
        handleClose();
        router.push(`/watch/${searchName}/tap${localStore.current.curr}`);
    };

    const handleDisagree = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem(film_id, '1'); // to know user used to answer this film
        }
        handleClose();
    };

    return (
        <div className={cx('wrapper')}>
            <Player key={numEp + 'video'} url={linkVideo} numEp={numEp} maxEp={filmEpisode.length} film_id={film_id} />
            <FilmInteract
                filmInfo={{ id: film_id, numEp }}
                serverVideo={serverVideo}
                setServerVideo={setServerVideo}
                data={filmEpisode[numEp - 1].link}
            />
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle id="alert-dialog-title">{'Bạn có muốn tiếp tục xem nội dung trước đó?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Xem tiếp túc tại tập {localStore.current.curr} vào lúc{' '}
                        {formatTime(localStore.current[localStore.current.curr])}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisagree}>Không</Button>
                    <Button autoFocus onClick={handleAgree}>
                        Có
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
