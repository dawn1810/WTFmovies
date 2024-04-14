import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { episodeSelector } from '~/redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { changeEpisode } from '~/app/watch/[movieName]/[numEp]/watchSlice';

export default function RatingMui() {
    const dispatch = useDispatch();

    const Ep = useSelector(episodeSelector);
    const [value, setValue] = useState<number>(Ep.rating);

    useEffect(() => {
        setValue(Ep.rating)
    },
        [Ep, dispatch])

    const handleRating = async (event: any, value: number | any) => {
        const newRating = { ...Ep };
        newRating.rating = value
        dispatch(changeEpisode(newRating));

        const postData = {
            rating: value,
            epId: Ep._id
        };

        // Thực hiện request POST
        const response = await fetch('/api/w/rating', {
            method: 'POST', // Chỉ định phương thức là POST
            headers: {
                'Content-Type': 'application/json', // Chỉ định kiểu nội dung của dữ liệu gửi đi
            },
            body: JSON.stringify(postData), // Chuyển đổi dữ liệu thành chuỗi JSON
        });

        // Xử lý response ở đây nếu cần
        const data:
            {
                statusCode: number,
                content: string
            } = await response.json();
        if (data.statusCode !== 200) alert('fail to rating')
    }
    return (
        <Box
            sx={{
                width: 220,
                display: 'flex',
                alignItems: 'center', color: 'var(--text-color)',
                gap: 1
            }}
        > <Box sx={{ width: 150 }} >Đánh giá:</Box>
            <Rating
                size="large"
                name="hover-feedback"
                value={value}
                precision={0.1}
                onChange={handleRating}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />

        </Box>
    );
}
