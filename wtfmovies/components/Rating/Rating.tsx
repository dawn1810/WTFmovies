import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { episodeSelector } from '~/redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { changeEpisode } from '~/app/(root)/watch/[movieName]/[numEp]/watchSlice';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';
import { AlertColor } from '@mui/material';
import { useDebounce } from '~/hooks';

export default function RatingMui() {
    const dispatch = useDispatch();

    const showAlert = (content: string, type: AlertColor) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

    const isFirstRender = useRef(true);
    const Ep = useSelector(episodeSelector);
    const [value, setValue] = useState<number>(Ep.rating);

    const ratingDebounce = useDebounce(value, 1000);

    useEffect(() => {
        setValue(Ep.rating);
    }, [Ep, dispatch]);

    useEffect(() => {
        if (isFirstRender.current) return;

        const postData = {
            rating: ratingDebounce,
            epId: Ep._id,
        };

        const fetchAPI = async () => {
            // Thực hiện request POST
            const response = await fetch('/api/v1/rating', {
                method: 'POST', // Chỉ định phương thức là POST
                headers: {
                    'Content-Type': 'application/json', // Chỉ định kiểu nội dung của dữ liệu gửi đi
                },
                body: JSON.stringify(postData), // Chuyển đổi dữ liệu thành chuỗi JSON
            });

            // Xử lý response ở đây nếu cần
            const data: {
                statusCode: number;
                content: string;
            } = await response.json();
            if (data.statusCode !== 200) showAlert('Vui lòng đăng nhập để đánh giá tập phim', 'info');
        };

        fetchAPI();
    }, [ratingDebounce]);

    const handleRating = async (event: any, value: number | any) => {
        const newRating = { ...Ep };
        newRating.rating = value;
        dispatch(changeEpisode(newRating));
        isFirstRender.current = false;
    };
    return (
        <Box
            sx={{
                width: 220,
                display: 'flex',
                alignItems: 'center',
                color: 'var(--text-color)',
                gap: 1,
            }}
        >
            {' '}
            <Box sx={{ width: 150 }}>Đánh giá:</Box>
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
