import classNames from 'classnames/bind';
// //import { AlertColor } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/hooks';

import style from './FilmButtonGroup.module.scss';

import Button from '../Button';
import { changeModalShow } from '~/layouts/components/Header/headerSlice';
import { showNotify } from '~/components/Notify/notifySlide';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(style);

function FilmButtonGroup({
    dir,
    loveState,
    filmId,
    searchName,
}: {
    dir?: string;
    loveState: boolean;
    filmId: string;
    searchName: string;
}) {
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: true }));
    };

    const isFirstRender = useRef(true);
    const [love, setLove] = useState(loveState);
    const [loading, setLoading] = useState(false);

    const loveDebounce = useDebounce(love, 1000);

    useEffect(() => {
        if (isFirstRender.current) return;

        const fetchApi = async () => {
            setLoading(true);

            const response = await fetch('/api/v1/updateLike', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filmId: [filmId], love: loveDebounce }),
            });

            if (response.ok) {
                setLoading(false);
            } else if (response.status === 400) {
                showAlert('Cập nhật yêu thích thất bại!', 'error');
            } else if (response.status === 403) {
                dispatch(changeModalShow(true));
                showAlert('Xác thực thất bại, đăng nhập để yêu thích phim', 'info');
            } else if (response.status === 500) {
                showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
            }
        };

        fetchApi();
    }, [loveDebounce]);

    const handleLike = () => {
        isFirstRender.current = false;
        setLove((prev) => !prev);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(`localhost:3000/review/${searchName}`);
        showAlert('Copied 😽😽😽', 'info');
    };

    return (
        <div className={cx('btn-group')}>
            <Button to={dir} primary leftIcon={<PlayArrowIcon />}>
                Xem phim
            </Button>
            <IconButton
                disabled={loading}
                size="large"
                style={{ color: love ? 'var(--highlight-color)' : 'var(--text-color)' }}
                onClick={handleLike}
            >
                {love ? <FavoriteIcon fontSize="inherit" /> : <FavoriteBorderIcon fontSize="inherit" />}
            </IconButton>
            <IconButton size="large" onClick={handleShare}>
                <ShareOutlinedIcon fontSize="inherit" />
            </IconButton>
        </div>
    );
}

export default FilmButtonGroup;
