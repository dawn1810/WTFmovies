import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

export default function RatingMui({ rating }: { rating?: number }) {
    const [value, setValue] = React.useState<number | undefined>(rating);
    const [hover, setHover] = React.useState(-1);
    console.log(value);

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
                onChange={(event, newValue: any) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />

        </Box>
    );
}
