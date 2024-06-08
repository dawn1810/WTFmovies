'use client';
import classNames from 'classnames/bind';
import style from './EditorDashboard.module.scss';
import NumCard from './NumCard';
import TableCard from './TableCard';
import {
    FilmHotInterface,
    LineChartDataInterface,
    NumStatisticalInterface,
    NumStatisticalInterfaceE,
    TopSixUserInfoInfterface,
} from '~/libs/interfaces';
import { calcViewChange, calcViewChangeE, getDataByYear, getDataByYearE, getDataCurrentYear, getDataCurrentYearE } from '~/libs/clientFunc';
import PieCard from './PieCard';

const cx = classNames.bind(style);



interface DatasetInterface {
    view: LineChartDataInterface[];
    user: LineChartDataInterface[];
    film: LineChartDataInterface[];
}

const convertNumberToMonth = (number: number) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    if (number < 0 || number > 11) {
        return 'Invalid month number';
    }

    return months[number];
};



export default function EditorDashboard({
    numStatistical,
    hotFilmList,
    topSixUser,
}: {
    numStatistical: NumStatisticalInterfaceE[] | any;
    hotFilmList: FilmHotInterface[];
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


