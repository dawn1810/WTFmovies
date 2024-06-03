import classNames from 'classnames/bind';
import Divider from '@mui/material/Divider';

import style from './LoveFilms.module.scss';
import Table from './Table';

const cx = classNames.bind(style);
function LoveFilms({ loveFilmsInfo }: { loveFilmsInfo: any }) {
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
