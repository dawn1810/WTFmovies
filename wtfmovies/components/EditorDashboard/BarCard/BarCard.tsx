import classNames from 'classnames/bind';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { BarChart } from '@mui/x-charts/BarChart';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';

import style from './BarCard.module.scss';

import { useState } from 'react';
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
    api,
}: {
    area?: string;
    dataset: FilmHotInterface[];
    series: any[];
    ykey: string;
    title: string;
    horizontal?: boolean;
    height: number;
    api: string;
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
    const [loading, setLoading] = useState(false);

    // dialog
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFilter = async () => {
        setOpen(false);
        setLoading(true);
        const response = await fetch(`/api/v1/admin/${api}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filter),
        });

        if (response.ok) {
            const res: FilmHotInterface[] = await response.json();
            setLoading(false);
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
                {loading ? (
                    <div className={cx('chart')}>
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <div className={cx('card-header')}>
                            <h4 className={cx('card-title')}>{title}</h4>
                            <IconButton aria-label="delete" onClick={handleOpen}>
                                <FilterListIcon />
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
                    </>
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
                        <CloseIcon />
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
