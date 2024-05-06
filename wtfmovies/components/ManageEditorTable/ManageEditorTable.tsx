'use client';
import Table from './Table';

const column = [
    { headerName: 'STT', field: 'index', width: 10 },
    { headerName: 'Email', field: 'id', width: 180 },
    { headerName: 'Tên hiễn thị', field: 'name', width: 180 },
    { headerName: 'Ngày sinh', field: 'birthdate', width: 180 },
    { headerName: 'Giới tính', field: 'gender', width: 180 },
    { headerName: 'Phân quyền', field: 'role', width: 180 },
    { headerName: 'Trạng thái', field: 'status', type: 'boolean', width: 180 },
];

const data = [
    {
        index: 1,
        id: 'binhminh0181@mail.com',
        name: 'Nguyễn Bình Minh',
        birthdate: '19-11-2003',
        gender: 'name',
        role: 'admin',
        status: true,
    },
];

export default function FilmPage() {
    return <Table title_name="Quản lý biên tập viên" column={column} dataset={data} />;
}
