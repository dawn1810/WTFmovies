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

const getDataCurrentYear = (data: NumStatisticalInterface[]): DatasetInterface => {
    // views statistic map
    const current_year = new Date().getFullYear();

    const yearDataset = data
        .filter((data) => {
            const dataTime = new Date(data.time);
            return dataTime.getFullYear() === current_year;
        })
        .map((data) => {
            const dataTime = new Date(data.time);
            return {
                month: convertNumberToMonth(dataTime.getMonth()),
                view: data.views,
                user: data.users,
                film: data.films,
            };
        });

    return {
        view: yearDataset.map((item) => ({
            time: item.month,
            data: item.view,
        })),
        user: yearDataset.map((item) => ({
            time: item.month,
            data: item.user,
        })),
        film: yearDataset.map((item) => ({
            time: item.month,
            data: item.film,
        })),
    };
};

const getDataByYear = (data: NumStatisticalInterface[]): DatasetInterface => {
    const viewsByYear: any = {};
    const usersByYear: any = {};
    const filmsByYear: any = {};

    data.forEach((item) => {
        const year = new Date(item.time).getFullYear().toString();

        if (!viewsByYear[year] || !usersByYear[year] || !filmsByYear[year]) {
            viewsByYear[year] = { time: year, data: 0 };
            usersByYear[year] = { time: year, data: 0 };
            filmsByYear[year] = { time: year, data: 0 };
        }

        viewsByYear[year].data += item.views;
        usersByYear[year].data += item.users;
        filmsByYear[year].data += item.films;
    });

    return { view: Object.values(viewsByYear), user: Object.values(usersByYear), film: Object.values(filmsByYear) };
};

const calcViewChange = (dataset: DatasetInterface, typeData: 'view' | 'user' | 'film') => {
    const currentMonth = dataset[typeData][dataset[typeData].length - 1].data;
    const previousMonth = dataset[typeData][dataset[typeData].length - 2].data;
    const prevMonthChange = previousMonth / (currentMonth / 100);
    const changePersent = Math.round((100 - prevMonthChange) * 10) / 10;

    return {
        number: currentMonth,
        change: changePersent < 0 ? -changePersent : changePersent,
        up: changePersent >= 0,
    };
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


