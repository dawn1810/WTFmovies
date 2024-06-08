'use client';
import classNames from 'classnames/bind';
import style from './EditorDashboard.module.scss';
import NumCard from './NumCard';
import TableCard from './TableCard';
import {
    FilmHotInterface,
    LineChartDataInterface,
    NumStatisticalInterface,
    TopSixUserInfoInfterface,
} from '~/libs/interfaces';
import { calcViewChange, getDataByYear, getDataCurrentYear } from '~/libs/clientFunc';

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



export default function AdminDashboard({
    numStatistical,
    hotFilmList,
    topSixUser,
}: {
    numStatistical: NumStatisticalInterface[];
    hotFilmList: FilmHotInterface[];
    topSixUser: TopSixUserInfoInfterface[];
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
                title="Lượt thích"
                number={users.number}
                change={users.change}
                area="num2"
                yearDataset={yearDataset.user}
                allDataset={allTimeDataset.user}
                up={users.up}
            />
            <NumCard
                title="Số tập đã upload"
                number={users.number}
                change={users.change}
                area="num3"
                yearDataset={yearDataset.user}
                allDataset={allTimeDataset.user}
                up={false}
            />
            {/* <TableCard
                area="table1"
                title="Danh sách bình luận"
                rows={topSixUser}
                cols={['Email', 'Tên hiển thị']}
            />
            <TableCard
                area="table2"
                title="Top những người yêu thích phim"
                rows={topSixUser}
                cols={['Email', 'Tên hiển thị']}
            /> */}



        </div>
    );
}


