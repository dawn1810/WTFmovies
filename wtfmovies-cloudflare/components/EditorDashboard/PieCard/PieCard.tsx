import classNames from 'classnames/bind';
import { useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
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
import { FilmTopInterface } from '~/libs/interfaces';

const cx = classNames.bind(style);

export default function PieCard({ area, hotFilmList }: { area: string, hotFilmList: FilmTopInterface }) {
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState({ time: 'week', sortBy: 'views' });
    const [dataChart, setDataChart] = useState(hotFilmList.week.views.map((item) => ({ id: item._id, label: item.name, value: item.views })));

    // dialog
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        console.log(filter);
        setDataChart(hotFilmList[filter.time][filter.sortBy].map((item) => ({ id: item._id, label: item.name, value: Number(item[filter.sortBy]) })))
        handleClose();
    };
    // filter
    const handleFilterChange = (event: any) => {
        setFilter((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    return (
        <>
            <Card style={{ gridArea: area }} className={cx('card')}>
                <div className={cx('card-header')}>
                    <h4 className={cx('card-title')}>Top phim thịnh hành</h4>
                    <IconButton aria-label="delete" onClick={handleOpen}>
                        <FilterListIcon />
                    </IconButton>
                </div>
                <PieChart
                    series={[
                        {
                            data: dataChart,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            innerRadius: 30,
                            outerRadius: 130,
                            paddingAngle: 2,
                            cornerRadius: 5,

                            cx: 180,
                            cy: 130,
                        },
                    ]}
                    slotProps={{
                        legend: {
                            position: { horizontal: 'middle', vertical: 'bottom' },
                        },
                    }}
                    height={450}
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
                    <span className={cx('title')}>Bộ lọc</span>
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
                            <FormControlLabel value="all" control={<Radio />} label="Tất cả" />
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
                            <FormControlLabel value="likes" control={<Radio />} label="Lượt thích" />
                            <FormControlLabel value="views" control={<Radio />} label="Lượt xem" />
                            <FormControlLabel value="comments" control={<Radio />} label="Số bình luận" />
                        </RadioGroup>
                    </div>
                    <DialogActions>
                        <Button onClick={handleSave}>Lưu</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
}
