import classNames from 'classnames/bind';

import style from './Admin.module.scss';
import AdminDashboard from '~/components/AdminDashboard';
import {
    getAllReport,
    getAllUser,
    getNewReport,
    getNumberStatistical,
    getTopHotFilm,
    getTopHotGenre,
    getTopSixUser,
} from '~/libs/getData/admin';
import { Link } from '@mui/material';
import ManageEditorTable from '~/components/ManageEditorTable';
import ManageReportTable from '~/components/ManageReportTable';
import { AdminReportInfterface } from '~/libs/interfaces';
import EvaluateTable from '~/components/EvaluateTable';
import { getAllUserScore, getEvaluateList, getVersionList } from '~/libs/getData/evaluate';
import NotFound from '~/app/(root)/not-found';
import AdminEvaluate from '~/components/AdminEvaluate';

const cx = classNames.bind(style);
export const fetchCache = 'force-no-store';

async function getPage(params?: any) {
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
        case 'evaluate':
            const evaluateList = await getEvaluateList();
            console.log(evaluateList);

            return <EvaluateTable evaluateList={evaluateList?.table} ver={evaluateList?.version || '0'} />;
        case 'userevaluate':
            const versionList = await getVersionList();
            const table = await getEvaluateList();
            const scores = await getAllUserScore(versionList[0].version);

            console.log(scores);

            const mappedScores = scores.map((score: any) => ({
                ...score,
                _id: score.email,
                adminScore: score.adminScore[0],
                userScore: score.userScore[0],
                time: score.time[0],
            }));

            return <AdminEvaluate table={table?.table} scores={mappedScores} versionList={versionList} />;
        case 'films':
            return <p>Quản lý films</p>;
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
