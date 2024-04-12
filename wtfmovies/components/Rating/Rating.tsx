import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels: { [index: string]: string } = {
    0.1: 'Rất tệ',
    0.2: 'Tệ',
    0.3: 'Chưa tốt',
    0.4: 'Không tốt',
    0.5: 'Trung bình',
    0.6: 'Khá ổn',
    0.7: 'Tốt',
    0.8: 'Rất tốt',
    0.9: 'Xuất sắc',
    1: 'Tuyệt vời',
    1.1: 'Phiên bản hoàn hảo',
    1.2: 'Siêu phẩm',
    1.3: 'Vượt trội',
    1.4: 'Hoàn hảo',
    1.5: 'Tuyệt đỉnh',
    1.6: 'Ngoạn mục',
    1.7: 'Thần thoại',
    1.8: 'Kinh điển',
    1.9: 'Thần thánh',
    2: 'Huyền thoại',
    2.1: 'Siêu huyền thoại',
    2.2: 'Đỉnh cao',
    2.3: 'Vĩ đại',
    2.4: 'Khủng khiếp',
    2.5: 'Cực phẩm',
    2.6: 'Vô cùng tuyệt vời',
    2.7: 'Siêu phàm',
    2.8: 'Kinh ngạc',
    2.9: 'Vô đối',
    3: 'Thần thánh',
    3.1: 'Thần thoại',
    3.2: 'Vĩ đại',
    3.3: 'Phiên bản hoàn hảo',
    3.4: 'Siêu phẩm',
    3.5: 'Tuyệt vời',
    3.6: 'Tuyệt đỉnh',
    3.7: 'Ngoạn mục',
    3.8: 'Thần thánh',
    3.9: 'Huyền thoại',
    4: 'Kinh điển',
    4.1: 'Siêu huyền thoại',
    4.2: 'Đỉnh cao',
    4.3: 'Vĩ đại',
    4.4: 'Khủng khiếp',
    4.5: 'Cực phẩm',
    4.6: 'Vô cùng tuyệt vời',
    4.7: 'Siêu phàm',
    4.8: 'Kinh ngạc',
    4.9: 'Vô đối',
    5: 'Thần thánh',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function RatingMui({ rating }: { rating: number }) {
    const [value, setValue] = React.useState<number | null>(null);
    const [hover, setHover] = React.useState(-1);
    console.log(value);

    return (
        <Box
            sx={{
                width: 500,
                display: 'flex',
                alignItems: 'center', color: 'var(--text-color)'
            }}
        > <Box sx={{ width: 150 }} >Đánh giá:</Box>
            <Rating
                size="large"
                name="hover-feedback"
                value={value ? value : rating}
                precision={0.1}
                getLabelText={getLabelText}
                onChange={(event, newValue: any) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
                <Box sx={{ ml: 2, color: 'var(--text-color)' }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    );
}
