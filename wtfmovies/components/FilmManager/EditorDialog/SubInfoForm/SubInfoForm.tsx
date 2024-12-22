import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { TextFieldProps } from '@mui/material/TextField';
import { Dispatch, SetStateAction, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';

interface SubInfoFormProps {
    notify: string;
    setNotify: Dispatch<SetStateAction<string>>;
    lichchieu: string | number | null;
    setLichchieu: Dispatch<SetStateAction<string | number | null>>;
    watchPercentage: number;
    setWatchPercentage: Dispatch<SetStateAction<number>>;
}

export default function SubInfoForm({
    notify,
    setNotify,
    lichchieu,
    setLichchieu,
    watchPercentage,
    setWatchPercentage,
}: SubInfoFormProps) {
    const [repeatInterval, setRepeatInterval] = useState<'weekly' | 'monthly'>(
        typeof lichchieu === 'number' ? 'weekly' : 'monthly'
    );

    const handleRepeatIntervalChange = (event: any) => {
        setRepeatInterval(event.target.value);
        setLichchieu(null);
    };

    const handleDayChange = (event: any) => {
        setLichchieu(event.target.value);
    };

    const handleDateChange = (newValue: Dayjs | null) => {
        setLichchieu(newValue ? newValue.format('YYYY-MM-DD') : null);
    };

    const isDateString = (value: any): value is string => {
        return typeof value === 'string' && !isNaN(Date.parse(value));
    };

    const renderWeekPickerDay = (date: any, selectedDates: any[], pickersDayProps: PickersDayProps<any>) => {
        const selectedDatesArray = Array.isArray(selectedDates) ? selectedDates : [];
        const isSelected = selectedDatesArray.some(selectedDate => selectedDate.getTime() === date.getTime());
        const isSameDayOfWeek = date && selectedDatesArray?.[0] && date.getDay() === selectedDatesArray[0].getDay();
        const today = new Date();
        const nextWeekStart = new Date(today.setDate(today.getDate() + (7 - today.getDay())));
        const isDisabled = date < nextWeekStart || date >= new Date(nextWeekStart.setDate(nextWeekStart.getDate() + 7));
        return <PickersDay {...pickersDayProps} selected={isSelected || isSameDayOfWeek} disabled={isDisabled} />;
    };

    return (
        <Box sx={{ margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <TextField
                required
                multiline
                rows={12.5}
                id="movie-notify"
                label="Thông báo"
                value={notify}
                onChange={(event) => setNotify(event.target.value)}
            />
            <Box sx={{ height: '100%', display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                <FormControl sx={{ mt: 2, mb: 2, width: '100%' }}>
                    <InputLabel id="repeat-interval-label">Khoảng cách lặp lại</InputLabel>
                    <Select
                        labelId="repeat-interval-label"
                        id="repeat-interval"
                        value={repeatInterval}
                        label="Khoảng cách lặp lại"
                        onChange={handleRepeatIntervalChange}
                    >
                        <MenuItem value="weekly">Hàng tuần</MenuItem>
                        <MenuItem value="monthly">Hàng tháng</MenuItem>
                    </Select>
                </FormControl>
                {repeatInterval === 'weekly' ? (
                    <FormControl sx={{ mt: 2, mb: 2, width: '100%' }}>
                        <InputLabel id="day-of-week-label">Chọn thứ</InputLabel>
                        <Select
                            labelId="day-of-week-label"
                            id="day-of-week"
                            value={typeof lichchieu === 'number' ? lichchieu : ''}
                            label="Chọn thứ"
                            onChange={handleDayChange}
                        >
                            <MenuItem value={0}>Chủ nhật</MenuItem>
                            <MenuItem value={1}>Thứ hai</MenuItem>
                            <MenuItem value={2}>Thứ ba</MenuItem>
                            <MenuItem value={3}>Thứ tư</MenuItem>
                            <MenuItem value={4}>Thứ năm</MenuItem>
                            <MenuItem value={5}>Thứ sáu</MenuItem>
                            <MenuItem value={6}>Thứ bảy</MenuItem>
                        </Select>
                    </FormControl>
                ) : (
                    <DatePicker
                        label="Chọn ngày"
                        value={isDateString(lichchieu) ? dayjs(lichchieu) : null}
                        onChange={handleDateChange}
                        views={['day']}
                        sx={{ mt: 2, mb: 2, width: '100%' }}
                    />
                )}
            </Box>
            <Box>
                <InputLabel id="slider-label">Canh chỉnh mốc cập nhật View</InputLabel>
                <Slider
                    min={10}
                    max={100}
                    shiftStep={30}
                    step={5}
                    marks
                    valueLabelDisplay="auto"
                    defaultValue={25}
                    value={watchPercentage}
                    onChange={(event, newValue) => setWatchPercentage(newValue as number)}
                    aria-labelledby="slider-label"
                />
            </Box>
        </Box>
    );
}
