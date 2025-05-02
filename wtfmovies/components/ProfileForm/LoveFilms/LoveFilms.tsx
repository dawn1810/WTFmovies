import classNames from 'classnames/bind';
import Divider from '@mui/material/Divider';

import style from './LoveFilms.module.scss';
import Table from './Table';
import { LoveFilmsInterface } from '~/libs/interfaces';

const cx = classNames.bind(style);
function LoveFilms({ loveFilmsInfo }: { loveFilmsInfo: LoveFilmsInterface[] }) {
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
            {!!loveFilmsInfo.length ? (
                <Table dataset={dataset} />
            ) : (
                <div className={cx('empty-list')}>Chưa có phim yêu thích. ❤️❤️❤️</div>
            )}
        </div>
    );
}

export default LoveFilms;
