import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotify } from '~/components/Notify/notifySlide';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
//import { AlertColor } from '@mui/material';
import IconButton from '@mui/material/IconButton';

export default function UnklikeButton({ searchName, unLikeFilm }: { searchName: string; unLikeFilm: any }) {
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: true }));
    };
    const [loading, setLoading] = useState(false);

    const handleUnlike = () => {
        const fetchApi = async () => {
            setLoading(true);

            const response = await fetch('/api/v1/updateLike', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filmId: [searchName], love: false }),
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
            <HeartBrokenOutlinedIcon />
        </IconButton>
    );
}
