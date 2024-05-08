import classNames from 'classnames/bind';

import style from './Admin.module.scss';
import AdminDashboard from '~/components/AdminDashboard';
import { getAllUser, getNumberStatistical, getTopHotFilm, getTopSixUser } from '~/libs/getData/admin';
import { Link } from '@mui/material';
import ManageEditorTable from '~/components/ManageEditorTable';

const cx = classNames.bind(style);

async function getPage(params?: any) {
    switch (params.page[0]) {
        case 'overview':
            const hotFilmList = await getTopHotFilm();
            const numStatistical = await getNumberStatistical();
            const topSixUser = await getTopSixUser();

            return <AdminDashboard numStatistical={numStatistical} hotFilmList={hotFilmList} topSixUser={topSixUser} />;
        case 'editor':
            const dataset = await getAllUser();

            return <ManageEditorTable dataset={dataset} />;
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
