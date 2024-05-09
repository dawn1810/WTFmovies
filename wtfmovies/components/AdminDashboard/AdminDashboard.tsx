'use client';
import classNames from 'classnames/bind';

import style from './AdminDashboard.module.scss';
import NumCard from './NumCard';
import BarCard from './BarCard';
import TableCard from './TableCard';
import PieCard from './PieCard';
import {
    FilmHotInterface,
    LineChartDataInterface,
    NumStatisticalInterface,
    TopSixUserInfoInfterface,
} from '~/libs/interfaces';

const cx = classNames.bind(style);

const dataset = [
    {
        views: 4000,
        likes: 150,
        rating: 2000,
        name: 'Inuyashiki',
    },
    {
        views: 3500,
        likes: 100,
        rating: 1006,
        name: 'Boku no Hero Academia',
    },
    {
        views: 3490,
        likes: 300,
        rating: 1070,
        name: 'Tensei shitara Slime Datta Ken',
    },
    {
        views: 2900,
        likes: 100,
        rating: 1000,
        name: "An Archdemon's Dilemma: How to Love Your Elf Bride",
    },
    {
        views: 1500,
        likes: 300,
        rating: 906,
        name: 'Tsuki ga Michibiku Isekai Douchuu',
    },
];

const series = [
    { dataKey: 'views', label: 'lượt xem', stack: 'total' },
    { dataKey: 'likes', label: 'lượt thích', stack: 'total' },
    { dataKey: 'rating', label: 'điểm đánh giá', stack: 'total' },
];

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
                url="/admin/editor"
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

// const data = [
//     {
//         email: 'binhminh19112003@gmail.com',
//         name: 'Nguyễn Bình Minh',
//         avatar:
//     },
// ];

// const colum = [
//     { title: 'Email', field: 'email', width: 280 },
//     { title: 'Họ và tên', field: 'name', width: 150 },
//     { title: 'Ảnh đại diện', field: 'avatar', width: 100 },
//     { title: 'Ngày sinh', field: 'birthDate', width: 100 },
//     { title: 'Giới tính', field: 'gender', width: 100 },
//     { title: 'Diễn viên yêu thích', field: 'actor', width: 100 },
//     { title: 'Đạo diễn yêu thích', field: 'director', width: 100 },
//     { title: 'Thể loại yêu thích', field: 'gernes', width: 100 },
//     { title: 'Ngôn ngữ yêu thích', field: 'languages', width: 100 },
//     { title: 'Trạng thái', field: 'status', width: 100 },
//     { title: 'Phân quyền', field: 'role', width: 100 },
// ];
