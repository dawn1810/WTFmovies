import classNames from 'classnames/bind';
import { BarChart } from '@mui/x-charts/BarChart';

import style from './BarCard.module.scss';
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
    Radio,
    RadioGroup,
} from '@mui/material';
import { useState } from 'react';
import { Close, FilterList } from '@mui/icons-material';

const cx = classNames.bind(style);

// const valueFormatter = (value: number | null) => `${value}mm`;

export default function BarCard({
    area,
    dataset,
    series,
    ykey,
    title,
    horizontal = false,
    height,
}: {
    area?: string;
    dataset: any[];
    series: any[];
    ykey: string;
    title: string;
    horizontal?: boolean;
    height: number;
}) {
    const chartSetting: any = horizontal
        ? {
              yAxis: [
                  {
                      scaleType: 'band',
                      dataKey: ykey,
                      valueFormatter: (value: any, context: any) =>
                          context.location === 'tick' ? value.substring(0, 3) : value,
                  },
              ],
              layout: 'horizontal',
          }
        : {
              xAxis: [
                  {
                      scaleType: 'band',
                      dataKey: ykey,
                      valueFormatter: (value: any, context: any) =>
                          context.location === 'tick' ? value.substring(0, 3) : value,
                  },
              ],
          };

    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState({ time: 'week', sortBy: 'view' });

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
                    <h4 className={cx('card-title')}>{title}</h4>
                    <IconButton aria-label="delete" onClick={handleOpen}>
                        <FilterList />
                    </IconButton>
                </div>
                <BarChart dataset={dataset} series={series} className={cx('chart')} height={height} {...chartSetting} />
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
                            <h3>Sắp xếp:</h3>
                            <RadioGroup
                                row
                                value={filter.sortBy}
                                name="sortBy"
                                className={cx('radio')}
                                onChange={handleFilterChange}
                            >
                                <FormControlLabel value="view" control={<Radio />} label="Lượt xem" />
                                <FormControlLabel value="like" control={<Radio />} label="Lượt thích" />
                                <FormControlLabel value="rating" control={<Radio />} label="Điểm đánh giá" />
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
