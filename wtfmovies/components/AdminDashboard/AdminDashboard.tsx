'use client';
import classNames from 'classnames/bind';

import style from './AdminDashboard.module.scss';
import NumCard from './NumCard';
import BarCard from './BarCard';
import TableCard from './TableCard';
import PieCard from './PieCard';
import { FilmHotInterface, NumStatisticalInterface, TopSixUserInfoInfterface } from '~/libs/interfaces';
import { calcViewChange, getDataByYear, getDataCurrentYear } from '~/libs/clientFunc';

const cx = classNames.bind(style);

const series = [
    { dataKey: 'views', label: 'lượt xem', stack: 'total' },
    { dataKey: 'likes', label: 'lượt thích', stack: 'total' },
    { dataKey: 'rating', label: 'điểm đánh giá', stack: 'total' },
];

export default function AdminDashboard({
    numStatistical,
    hotFilmList,
    topSixUser,
    hotGenreList,
    newReports,
}: {
    numStatistical: NumStatisticalInterface[];
    hotFilmList: FilmHotInterface[];
    hotGenreList: FilmHotInterface[];
    topSixUser: TopSixUserInfoInfterface[];
    newReports: any[];
}) {
    const yearDataset = getDataCurrentYear(numStatistical);
    const allTimeDataset = getDataByYear(numStatistical);

    const views = calcViewChange(yearDataset, 'view');
    const users = calcViewChange(yearDataset, 'user');
    const films = calcViewChange(yearDataset, 'film');

    return (
        <div className={cx('wrapper')}>
            <NumCard
                title="Lượt xem"
                number={views.number}
                change={views.change}
                area="num1"
                yearDataset={yearDataset.view}
                allDataset={allTimeDataset.view}
                up={views.up}
            />
            <NumCard
                title="Người dùng"
                number={users.number}
                change={users.change}
                area="num2"
                yearDataset={yearDataset.user}
                allDataset={allTimeDataset.user}
                up={users.up}
            />
            <NumCard
                title="Phim đăng tải"
                number={films.number}
                change={films.change}
                area="num3"
                yearDataset={yearDataset.film}
                allDataset={allTimeDataset.film}
                up={films.up}
            />
            <BarCard
                area="bar1"
                dataset={hotFilmList}
                series={series}
                ykey="name"
                title="Danh sách phim nổi bật"
                height={350}
                horizontal
                api="hotFilmFilter"
            />
            <TableCard
                area="table1"
                title="Danh sách người dùng"
                rows={topSixUser}
                url="/admin/users"
                cols={['Email', 'Tên hiển thị']}
            />
            <BarCard
                area="bar2"
                dataset={hotGenreList}
                series={series}
                ykey="name"
                title="Danh sách thể loại nổi bật"
                height={350}
                api="hotGenreFilter"
            />
            <PieCard area="pie" />
            <TableCard
                area="table2"
                title="Danh sách báo cáo"
                rows={newReports}
                url="/admin/report"
                cols={['Loại', 'Email', 'Thời gian']}
            />
        </div>
    );
}
