import { HeartBrokenOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';

export default function UnklikeButton({ searchName, unLikeFilm }: { searchName: string; unLikeFilm: any }) {
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
                alert('Cập nhật yêu thích thất bại!');
            } else if (response.status === 500) {
                alert('Lỗi trong quá trình cập nhật yêu thích');
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
