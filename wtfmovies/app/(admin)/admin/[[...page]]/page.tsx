import classNames from 'classnames/bind';

import style from './Admin.module.scss';
import AdminDashboard from '~/components/AdminDashboard';
import {
    getAllComment,
    getAllReport,
    getAllUser,
    getNewReport,
    getNumberStatistical,
    getTopHotFilm,
    getTopHotGenre,
    getTopSixUser,
} from '~/libs/getData/admin';
import Link from '@mui/material/Link';
import ManageEditorTable from '~/components/ManageEditorTable';
import ManageReportTable from '~/components/ManageReportTable';
import { AdminReportInfterface, ExtendedUser } from '~/libs/interfaces';
import NotFound from '~/app/(root)/not-found';
import ManageCommentTable from '~/components/ManageCommentTable';
import { redirect } from 'next/navigation';
import { auth } from '~/app/api/auth/[...nextauth]/auth';

const cx = classNames.bind(style);

export const fetchCache = 'force-no-store';

async function getPage(params?: any) {
    const session = await auth();
    const extendedUser: ExtendedUser | undefined = session?.user;

    if (!session || extendedUser?.role !== 'admin') {
        redirect('/');
    } else {
        switch (params.page[0]) {
            case 'overview':
                const hotFilmList = await getTopHotFilm();
                const hotGenreList = await getTopHotGenre();
                const numStatistical = await getNumberStatistical();
                const topSixUser = await getTopSixUser();
                const newReports = await getNewReport();

                return (
                    <AdminDashboard
                        numStatistical={numStatistical}
                        hotFilmList={hotFilmList}
                        topSixUser={topSixUser}
                        hotGenreList={hotGenreList}
                        newReports={newReports}
                    />
                );
            case 'users':
                const dataset = await getAllUser();

                return <ManageEditorTable dataset={dataset} />;
            case 'report':
                const reports: AdminReportInfterface[] = await getAllReport();

                return <ManageReportTable dataset={reports} />;
            case 'comment':
                const comments: any[] = await getAllComment();

                return <ManageCommentTable dataset={comments} />;
            case 'films':
                return <p>Quản lý films</p>;
            default:
                return NotFound();
        }
    }
}

export default function Admin({ params }: { params?: { page: string[] } }) {
    return <div className={cx('wrapper')}>{getPage(params)}</div>;
}
