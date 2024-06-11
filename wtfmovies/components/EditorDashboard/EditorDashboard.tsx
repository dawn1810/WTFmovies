'use client';
import classNames from 'classnames/bind';
import style from './EditorDashboard.module.scss';
import NumCard from './NumCard';
import TableCard from './TableCard';
import {
    FilmTopInterface,
    NumStatisticalInterfaceE,
    TopSixUserInfoInfterface,
} from '~/libs/interfaces';
import { calcViewChangeE, getDataByYearE, getDataCurrentYearE } from '~/libs/clientFunc';
import PieCard from './PieCard';

const cx = classNames.bind(style);




export default function EditorDashboard({
    numStatistical,
    hotFilmList,
    topSixUser,
}: {
    numStatistical: NumStatisticalInterfaceE[] | any;
    hotFilmList: FilmTopInterface;
    topSixUser: TopSixUserInfoInfterface[];
}) {
    const yearDataset = getDataCurrentYearE(numStatistical);
    const allTimeDataset = getDataByYearE(numStatistical);

    const views = calcViewChangeE(yearDataset, 'view');
    const likes = calcViewChangeE(yearDataset, 'likes');
    const eps = calcViewChangeE(yearDataset, 'eps');

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
                title="Lượt thích"
                number={likes.number}
                change={likes.change}
                area="num2"
                yearDataset={yearDataset.likes}
                allDataset={allTimeDataset.likes}
                up={likes.up}
            />
            <NumCard
                title="Số tập đã upload"
                number={eps.number}
                change={eps.change}
                area="num3"
                yearDataset={yearDataset.eps}
                allDataset={allTimeDataset.eps}
                up={eps.up}
            />
            <TableCard
                url='/editor/comment'
                area="table1"
                title="Danh sách bình luận"
                rows={topSixUser}
                cols={['Email', 'Tên hiển thị']}
            />
            <PieCard hotFilmList={hotFilmList} area="pie" />




        </div>
    );
}


