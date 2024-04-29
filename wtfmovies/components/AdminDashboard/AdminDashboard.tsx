'use client';
import classNames from 'classnames/bind';

import style from './AdminDashboard.module.scss';
import NumCard from './NumCard';
import BarCard from './BarCard';
import TableCard from './TableCard';
import PieCard from './PieCard';

const cx = classNames.bind(style);

const dataset = [
    {
        views: 4000,
        likes: 150,
        rating: 2000,
        filmName: 'Inuyashiki',
    },
    {
        views: 3500,
        likes: 100,
        rating: 1006,
        filmName: 'Boku no Hero Academia',
    },
    {
        views: 3490,
        likes: 300,
        rating: 1070,
        filmName: 'Tensei shitara Slime Datta Ken',
    },
    {
        views: 2900,
        likes: 100,
        rating: 1000,
        filmName: "An Archdemon's Dilemma: How to Love Your Elf Bride",
    },
    {
        views: 1500,
        likes: 300,
        rating: 906,
        filmName: 'Tsuki ga Michibiku Isekai Douchuu',
    },
];

const series = [
    { dataKey: 'views', label: 'lượt xem', stack: 'total' },
    { dataKey: 'rating', label: 'lượt đánh giá', stack: 'total' },
    { dataKey: 'likes', label: 'lượt thích', stack: 'total' },
];

export default function AdminDashboard() {
    return (
        <div className={cx('wrapper')}>
            <NumCard title="Lượt xem" number={300000} change={18} area="num1" up />
            <NumCard title="Người dùng" number={100000} change={18} area="num2" />
            <NumCard title="Phim đăng tải" number={10} change={18} area="num3" up />
            <BarCard
                area="bar1"
                dataset={dataset}
                series={series}
                ykey="filmName"
                title="Danh sách film được quan tâm"
                height={350}
                horizontal
            />
            <TableCard area="table1" />
            <BarCard
                area="bar2"
                dataset={dataset}
                series={series}
                ykey="filmName"
                title="Danh sách thể loại được quan tâm"
                height={350}
            />
            <PieCard area="pie" />
            <TableCard area="table2" />
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
