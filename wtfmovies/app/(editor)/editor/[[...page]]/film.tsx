'use client';
import FilmManager from '~/components/FilmManager';
import { data } from './mockdata';

export const colum = [
    { headerName: 'Phim ID', field: 'id', width: 280 },
    { headerName: 'Tên phim', field: 'name', width: 150 },
    { headerName: 'Mô tả', field: 'describe', width: 100 },
    { headerName: 'Trạng thái', field: 'status', width: 100 },
    { headerName: 'Tác giả', field: 'author', width: 100 },
    { headerName: 'Thể loại', field: 'gerne', width: 100 },
    { headerName: 'Đạo diễn', field: 'director', width: 100 },
    { headerName: 'Thời lượng', field: 'duration', width: 100 },
    { headerName: 'Loại video', field: 'videoType', width: 100 },
    { headerName: 'Năm xuất bản', field: 'releaseYear', width: 100 },
    { headerName: 'Quốc gia', field: 'country', width: 100 },
    { headerName: 'Điểm đánh giá', field: 'rating', width: 100 },
];
export default function FilmPage() {
    return (
        <FilmManager title_name="Tổng quan" colum={colum}>
            {data}
        </FilmManager>
    );
}
