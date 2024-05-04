import classNames from 'classnames/bind';
import { PieChart } from '@mui/x-charts/PieChart';
import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    IconButton,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
} from '@mui/material';

import style from './PieCard.module.scss';
import { useState } from 'react';
import { Close, FilterList } from '@mui/icons-material';

const cx = classNames.bind(style);

const data = [
    { id: 0, value: 100, label: 'Naruto' },
    { id: 1, value: 75, label: 'Sasuke' },
    { id: 2, value: 70, label: '寂しい 犬' },
    { id: 3, value: 50, label: 'Lon Dai dE' },
    { id: 4, value: 18, label: 'Đẹp gái nhất thế giới' },
];

export default function PieCard({ area }: { area: string }) {
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState({ time: 'week', sortBy: 'all' });

    // dialog
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // filter
    const handleFilterChange = (event: any) => {
        setFilter((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };
    return (
        <>
            <Card style={{ gridArea: area }} className={cx('card')}>
                <div className={cx('card-header')}>
                    <h4 className={cx('card-title')}>Tìm kiếm thịnh hành</h4>
                    <IconButton aria-label="delete" onClick={handleOpen}>
                        <FilterList />
                    </IconButton>
                </div>
                <PieChart
                    series={[
                        {
                            data,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            startAngle: 90,
                            endAngle: 360,
                        },
                    ]}
                    slotProps={{
                        legend: {
                            position: { horizontal: 'right', vertical: 'top' },
                        },
                    }}
                    height={350}
                />
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={cx('dialog')}
            >
                <DialogTitle className={cx('dialog-title')}>
                    <span className={cx('title')}>Tìm kiếm thịnh hành</span>
                    <IconButton aria-label="delete" onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className={cx('filter')}>
                            <h3>Thời gian:</h3>
                            <RadioGroup
                                row
                                value={filter.time}
                                name="time"
                                className={cx('radio')}
                                onChange={handleFilterChange}
                            >
                                <FormControlLabel value="week" control={<Radio />} label="Tuần" />
                                <FormControlLabel value="month" control={<Radio />} label="Tháng" />
                                <FormControlLabel value="year" control={<Radio />} label="Năm" />
                            </RadioGroup>
                        </div>
                        <div className={cx('filter')}>
                            <h3>Chủ đề:</h3>
                            <RadioGroup
                                value={filter.sortBy}
                                name="sortBy"
                                className={cx('radio')}
                                onChange={handleFilterChange}
                            >
                                <FormControlLabel value="all" control={<Radio />} label="Tất cả" />
                                <FormControlLabel value="director" control={<Radio />} label="Tác giả | Đạo diễn" />
                                <FormControlLabel value="actor" control={<Radio />} label="Diễn viên" />
                                <FormControlLabel value="character" control={<Radio />} label="Nhân vật" />
                                <FormControlLabel value="film" control={<Radio />} label="Phim" />
                            </RadioGroup>
                        </div>
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleClose}>HUỶ</Button>
                        <Button onClick={handleClose}>LƯU</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
}
