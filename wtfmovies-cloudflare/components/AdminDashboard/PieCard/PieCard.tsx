import classNames from 'classnames/bind';
import { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';

import style from './PieCard.module.scss';

const cx = classNames.bind(style);

export default function PieCard({ area, data }: { area: string; data: any[] }) {
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
                        <FilterListIcon />
                    </IconButton>
                </div>
                <PieChart
                    series={[
                        {
                            data,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            innerRadius: 18,
                            outerRadius: 120,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            cx: 180,
                            cy: 200,
                            // startAngle: 90,
                            // endAngle: 360,
                        },
                    ]}
                    slotProps={{
                        legend: {
                            direction: 'row',
                            position: { horizontal: 'left', vertical: 'top' },
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
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
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
                    <DialogActions>
                        <Button onClick={handleClose}>HUỶ</Button>
                        <Button onClick={handleClose}>XEM</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
}
