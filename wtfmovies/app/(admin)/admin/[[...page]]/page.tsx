import classNames from 'classnames/bind';

import style from './Admin.module.scss';
import AdminDashboard from '~/components/AdminDashboard';
import { getNumberStatistical, getTopHotFilm } from '~/libs/getData/admin';
import { Link } from '@mui/material';

const cx = classNames.bind(style);

async function getPage(params?: any) {
    switch (params.page[0]) {
        case 'overview':
            const hotFilmList = await getTopHotFilm();
            const numStatistical = await getNumberStatistical();

            return <AdminDashboard numStatistical={numStatistical} hotFilmList={hotFilmList} />;
        default:
            return (
                <div style={{ color: 'var(--text-color)' }}>
                    Có lỗi click vào đường <Link href="https://youtu.be/dQw4w9WgXcQ?si=dzkuRbxmFUbdfbmu">link</Link> để
                    báo cáo lỗi. Cảm ơn bạn rất nhiều xin hậu tạ về sau.
                </div>
            );
    }
}

export default function Admin({ params }: { params?: { page: string[] } }) {
    return <div className={cx('wrapper')}>{getPage(params)}</div>;
}
