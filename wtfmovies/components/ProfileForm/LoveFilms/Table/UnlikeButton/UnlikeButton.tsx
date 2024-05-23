import { HeartBrokenOutlined } from '@mui/icons-material';
import { AlertColor, IconButton } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';

export default function UnklikeButton({ searchName, unLikeFilm }: { searchName: string; unLikeFilm: any }) {
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: AlertColor) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };
    const [loading, setLoading] = useState(false);

    const handleUnlike = () => {
        const fetchApi = async () => {
            setLoading(true);

            const response = await fetch('/api/v1/updateLike', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ searchName: [searchName], love: false }),
            });

            if (response.ok) {
                unLikeFilm(searchName);
                setLoading(false);
            } else if (response.status === 400) {
                showAlert('Cập nhật yêu thích thất bại!', 'error');
            } else if (response.status === 500) {
                showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
            }
        };

        fetchApi();
    };

    return (
        <IconButton disabled={loading} onClick={handleUnlike}>
            <HeartBrokenOutlined />
        </IconButton>
    );
}
