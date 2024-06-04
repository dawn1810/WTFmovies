import classNames from 'classnames/bind';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { LineChart } from '@mui/x-charts/LineChart';

import style from './NumCard.module.scss';
import { useState } from 'react';
import { LineChartDataInterface } from '~/libs/interfaces';

const cx = classNames.bind(style);

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
    yearDataset,
    allDataset,
    up = false,
}: {
    title: string;
    number: number;
    change: number;
    area?: string;
    yearDataset: LineChartDataInterface[];
    allDataset: LineChartDataInterface[];
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
                            {up ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
                        <CloseIcon />
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
                            series={[{ dataKey: 'data', label: title, showMark: false, stackOffset: 'none' }]}
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
