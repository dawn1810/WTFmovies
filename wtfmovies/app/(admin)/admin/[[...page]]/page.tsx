import classNames from 'classnames/bind';

import style from './Admin.module.scss';
import AdminDashboard from '~/components/AdminDashboard';
import {
    getAllCarosel,
    getAllComment,
    getAllReport,
    getAllUser,
    getNewReport,
    getNumberStatistical,
    getReportedFilm,
    getTopHotFilm,
    getTopHotGenre,
    getTopSearch,
    getTopSixUser,
} from '~/libs/getData/admin';
import ManageEditorTable from '~/components/ManageEditorTable';
import ManageReportTable from '~/components/ManageReportTable';
import { AdminCaroselInfterface, AdminReportInfterface, ExtendedUser } from '~/libs/interfaces';
import NotFound from '~/app/(root)/not-found';
import ManageCommentTable from '~/components/ManageCommentTable';
import { redirect } from 'next/navigation';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { getSideMovieFormInfo, getFilm } from '~/libs/getData/editor';
import FilmPage from '~/components/FilmManager';
import ManageCaroselTable from '~/components/ManageCaroselTable';
import ManageFilmReportTable from '~/components/ManageFilmReportTable';

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
                const topSearch = await getTopSearch();

                if (!hotFilmList || !hotGenreList || !numStatistical || !topSixUser || !newReports) break;
                else
                    return (
                        <AdminDashboard
                            numStatistical={numStatistical}
                            hotFilmList={hotFilmList}
                            topSixUser={topSixUser}
                            hotGenreList={hotGenreList}
                            newReports={newReports}
                            topSearch={topSearch}
                        />
                    );
            case 'users':
                const dataset = await getAllUser();

                if (!dataset) break;
                return <ManageEditorTable dataset={dataset} />;
            case 'report':
                switch (params.page[1]) {
                    case 'comment':
                        const comments: any[] = await getAllComment();

                        if (!comments) break;
                        return <ManageCommentTable dataset={comments} />;
                    case 'film':
                        const films: any[] = await getReportedFilm();

                        return <ManageFilmReportTable dataset={films} />;
                    case 'bug':
                        const reports: AdminReportInfterface[] = await getAllReport();

                        if (!reports) break;
                        return <ManageReportTable dataset={reports} />;
                    default:
                        return '';
                }

            // case 'comment':
            //     const comments: any[] = await getAllComment();

            //     if (!comments) break;
            //     return <ManageCommentTable dataset={comments} />;
            case 'films':
                const data = await getFilm();
                const sideMovieFormInfo = await getSideMovieFormInfo();
                return <FilmPage data={data} sideMovieFormInfo={sideMovieFormInfo} />;
            case 'carosel':
                const carosel: AdminCaroselInfterface[] = await getAllCarosel();

                if (!carosel) break;
                else return <ManageCaroselTable dataset={carosel} />;
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
