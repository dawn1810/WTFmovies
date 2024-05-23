import classNames from 'classnames/bind';
import { AlertColor, IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/hooks';

import style from './FilmButtonGroup.module.scss';
import { Favorite, FavoriteBorder, PlayArrow, ShareOutlined } from '@mui/icons-material';
import Button from '../Button';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(style);

function FilmButtonGroup({ dir, loveState, searchName }: { dir?: string; loveState: boolean; searchName: string }) {
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: AlertColor) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

    const isFirstRender = useRef(true);
    const [love, setLove] = useState(loveState);
    const [loading, setLoading] = useState(false);

    const loveDebounce = useDebounce(love, 1000);

    useEffect(() => {
        if (isFirstRender.current) {
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const response = await fetch('/api/v1/updateLike', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ searchName: [searchName], love: loveDebounce }),
            });

            if (response.ok) {
                setLoading(false);
            } else if (response.status === 400) {
                showAlert('Cập nhật yêu thích thất bại!', 'error');
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
            <Button to={dir} primary leftIcon={<PlayArrow />}>
                Xem phim
            </Button>
            <IconButton
                disabled={loading}
                size="large"
                style={{ color: love ? 'var(--highlight-color)' : 'var(--text-color)' }}
                onClick={handleLike}
            >
                {love ? <Favorite fontSize="inherit" /> : <FavoriteBorder fontSize="inherit" />}
            </IconButton>
            <IconButton size="large" onClick={handleShare}>
                <ShareOutlined fontSize="inherit" />
            </IconButton>
        </div>
    );
}

export default FilmButtonGroup;
