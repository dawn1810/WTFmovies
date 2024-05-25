import classNames from 'classnames/bind';
import { useState } from 'react';
import {
    Button,
    ButtonGroup,
    Checkbox,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

import style from './LoveFilms.module.scss';
import { HeartBrokenOutlined, NotificationsNone, NotificationsOffOutlined } from '@mui/icons-material';
import Table from './Table';

const cx = classNames.bind(style);

// const dataset = [
//     {
//         id: '1',
//         name: 'Dororo',
//         img: 'https://w0.peakpx.com/wallpaper/833/389/HD-wallpaper-dororo-hyakkimaru-alone-mountain-japan-sad-90s-samurai-anime.jpg',
//         views: 1000,
//         likes: 100,
//         status: 'Hoàn thành',
//         updateTime: '2024-05-21T10:14:47.170Z',
//         notification: false,
//     },
//     {
//         id: '2',
//         name: 'Frieren - Pháp sư tiễn táng',
//         img: 'https://m.media-amazon.com/images/M/MV5BMjVjZGU5ZTktYTZiNC00N2Q1LThiZjMtMDVmZDljN2I3ZWIwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
//         views: 1000,
//         likes: 100,
//         status: 'Hoàn thành',
//         updateTime: '2024-05-21T15:04:24.887Z',
//         notification: true,
//     },
// ];

function LoveFilms({ loveFilmsInfo }: { loveFilmsInfo: any }) {
    const [checked, setChecked] = useState<number[]>([]);

    const dataset = loveFilmsInfo.map((info: any) => ({
        ...info,
        id: info.film_id,
        notification: true,
    }));

    return (
        <div className={cx('wrapper')}>
            <Divider textAlign="left" className={cx('divider')}>
                DANH SÁCH PHIM YÊU THÍCH
            </Divider>
            <Table dataset={dataset} />
        </div>
    );
}

export default LoveFilms;
