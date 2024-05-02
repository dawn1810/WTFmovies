import classNames from 'classnames/bind';
import { Close, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
    Button,
    Card,
    CardActionArea,
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
import { LineChart } from '@mui/x-charts/LineChart';

import style from './NumCard.module.scss';
import { useState } from 'react';

const cx = classNames.bind(style);

const yearDataset = [
    { time: 'January', views: 34567 },
    { time: 'February', views: 12345 },
    { time: 'March', views: 78901 },
    { time: 'April', views: 54321 },
    { time: 'May', views: 23456 },
    { time: 'June', views: 67890 },
    { time: 'July', views: 12345 },
    { time: 'August', views: 78901 },
    { time: 'September', views: 54321 },
    { time: 'October', views: 23456 },
    { time: 'November', views: 67890 },
    { time: 'December', views: 12345 },
];

const allDataset = [
    { time: '2018', views: 614898 },
    { time: '2019', views: 183957 },
    { time: '2020', views: 637025 },
    { time: '2021', views: 323604 },
    { time: '2022', views: 661253 },
    { time: '2023', views: 875092 },
    { time: '2024', views: 647318 },
];

function formatLargeNumber(num: number) {
    if (typeof num !== 'number' || isNaN(num)) {
        return num;
    }

    if (num >= 1000000000) {
        return `${(num / 1000000000).toFixed(1)}B`;
    } else if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}k`;
    } else {
        return num;
    }
}

export default function NumCard({
    title,
    number,
    change,
    area,
    up = false,
}: {
    title: string;
    number: number;
    change: number;
    area?: string;
    up?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState('year');

    // dialog
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // filter
    const handleFilterChange = (event: any) => {
        setFilter(event.target.value);
    };

    return (
        <>
            <Card style={{ gridArea: area }}>
                <CardActionArea className={cx('card-area', { 'card-green': up })} onClick={handleOpen}>
                    <h4 className={cx('card-title')}>{title}</h4>
                    <div className={cx('card-content')}>
                        <div className={cx('number')}>{number}</div>
                        <div
                            className={cx('change')}
                            style={{ color: up ? 'var(--green-highlight-color)' : 'var(--highlight-color)' }}
                        >
                            {up ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            {change}%
                        </div>
                    </div>
                </CardActionArea>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={cx('dialog')}
            >
                <DialogTitle className={cx('dialog-title')}>
                    <span className={cx('title')}>{title}</span>
                    <IconButton aria-label="delete" onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className={cx('filter')}>
                            <h3>Bộ lọc:</h3>
                            <RadioGroup row value={filter} name="filter" onChange={handleFilterChange}>
                                <FormControlLabel value="year" control={<Radio />} label="Năm nay" />
                                <FormControlLabel value="all" control={<Radio />} label="Tất cả" />
                            </RadioGroup>
                        </div>
                        <LineChart
                            xAxis={[
                                {
                                    scaleType: 'band',
                                    dataKey: 'time',
                                    valueFormatter: (time, context) =>
                                        context.location === 'tick' && filter === 'year' ? time.slice(0, 3) : time,
                                },
                            ]}
                            yAxis={[
                                {
                                    valueFormatter: (value, context) =>
                                        context.location === 'tick' ? formatLargeNumber(value) : value,
                                },
                            ]}
                            series={[{ dataKey: 'views', label: title, showMark: false, stackOffset: 'none' }]}
                            dataset={filter === 'year' ? yearDataset : allDataset}
                            slotProps={{ legend: { hidden: true } }}
                            width={500}
                            height={300}
                        />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}
