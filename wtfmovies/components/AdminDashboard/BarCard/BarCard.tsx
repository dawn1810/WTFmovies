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
import { FilmHotInterface } from '~/libs/interfaces';

const cx = classNames.bind(style);

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
    dataset: FilmHotInterface[];
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
    const [filter, setFilter] = useState({ time: 0, sortBy: 0 });
    const [dataState, setDataState] = useState(dataset);

    // dialog
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFilter = async () => {
        setOpen(false);
        const response = await fetch('/api/v1/admin/hotFilmFilter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filter),
        });

        if (response.ok) {
            const res: FilmHotInterface[] = await response.json();

            setDataState(res);
        }
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
                {!!dataState && !!dataState.length ? (
                    <BarChart
                        dataset={dataState}
                        series={series}
                        className={cx('chart')}
                        height={height}
                        {...chartSetting}
                    />
                ) : (
                    <div className={cx('chart')}>Chưa có dữ liệu</div>
                )}
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={cx('dialog')}
            >
                <DialogTitle className={cx('dialog-title')}>
                    <span className={cx('title')}>Bộ lọc</span>
                    <IconButton aria-label="delete" onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className={cx('filter')}>
                            <h4>Thời gian:</h4>
                            <RadioGroup
                                row
                                value={filter.time}
                                name="time"
                                className={cx('radio')}
                                onChange={handleFilterChange}
                            >
                                <FormControlLabel value={0} control={<Radio />} label="Tuần" />
                                <FormControlLabel value={1} control={<Radio />} label="Tháng" />
                                <FormControlLabel value={2} control={<Radio />} label="Năm" />
                            </RadioGroup>
                        </div>
                        <div className={cx('filter')}>
                            <h4>Sắp xếp:</h4>
                            <RadioGroup
                                row
                                value={filter.sortBy}
                                name="sortBy"
                                className={cx('radio')}
                                onChange={handleFilterChange}
                            >
                                <FormControlLabel value={0} control={<Radio />} label="Lượt xem" />
                                <FormControlLabel value={2} control={<Radio />} label="Lượt thích" />
                                <FormControlLabel value={3} control={<Radio />} label="Điểm đánh giá" />
                            </RadioGroup>
                        </div>
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleClose}>HUỶ</Button>
                        <Button onClick={handleFilter}>XEM</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
}
