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
                const numStatistical = await getNumberStatistical('admin');
                const topSixUser = await getTopSixUser();
                const newReports = await getNewReport();

                if (!hotFilmList || !hotGenreList || !numStatistical || !topSixUser || !newReports) break;
                else
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

                if (!dataset) break;
                else return <ManageEditorTable dataset={dataset} />;
            case 'report':
                const reports: AdminReportInfterface[] = await getAllReport();

                if (!reports) break;
                else return <ManageReportTable dataset={reports} />;
            case 'comment':
                const comments: any[] = await getAllComment();

                if (!comments) break;
                else return <ManageCommentTable dataset={comments} />;
            case 'films':
                return <p>Quản lý films</p>;
            default:
                break;
        }
        return NotFound();
    }
}

export default async function Admin({ params }: { params?: { page: string[] } }) {
    const page = await getPage(params);
    return <div className={cx('wrapper')}>{page}</div>;
}
