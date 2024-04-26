'use client';
import classNames from 'classnames/bind';

import style from './AdminDashboard.module.scss';
import NumCard from './NumCard';

const cx = classNames.bind(style);

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
export default function AdminDashboard() {
    return (
        <div className={cx('wrapper')}>
            <NumCard title="Lượt xem" number={300000} change={18} up />
            <NumCard title="Người dùng" number={100000} change={18} />
            <NumCard title="Phim đăng tải" number={10} change={18} up />
        </div>
    );
}
