import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { DatePicker } from '@mui/x-date-pickers';
import { Dispatch, SetStateAction } from 'react';

interface SubInfoFormProps {
    titleMovie: string;
    setTitleMovie: Dispatch<SetStateAction<string>>;
    year: any;
    setYear: Dispatch<SetStateAction<any>>;
    watchPercentage: number;
    setWatchPercentage: Dispatch<SetStateAction<number>>;
}

export default function SubInfoForm({
    titleMovie,
    setTitleMovie,
    year,
    setYear,
    watchPercentage,
    setWatchPercentage,
}: SubInfoFormProps) {
    return (
        <Box sx={{ margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <TextField
                required
                id="movie-notify"
                label="Thông báo"
                value={titleMovie}
                onChange={(event) => setTitleMovie(event.target.value)}
            />
            <DatePicker
                views={['month', 'day']}
                value={year}
                onChange={(newValue) => setYear(newValue)}
                label="Lịch chiếu"
            />
            <Slider
                value={watchPercentage}
                onChange={(event, newValue) => setWatchPercentage(newValue as number)}
                aria-labelledby="watch-percentage-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={100}
            />
        </Box>
    );
}
