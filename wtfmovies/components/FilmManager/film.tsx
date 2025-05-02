import FilmManager from './FilmManager';


export default async function FilmPage({ data, sideMovieFormInfo }: { data: any, sideMovieFormInfo: any }) {

    const colum = [
        { headerName: 'Phim ID', field: 'id', width: 190 },
        { headerName: 'Tên phim', field: 'name', width: 250 },
        { headerName: 'Mô tả', field: 'describe', width: 100 },
        { headerName: 'Trạng thái', field: 'status', width: 100 },
        { headerName: 'Tác giả', field: 'author', width: 100 },
        { headerName: 'Thể loại', field: 'genre', width: 100 },
        { headerName: 'Đạo diễn', field: 'director', width: 100 },
        { headerName: 'Thời lượng', field: 'durationAsString', width: 100 },
        { headerName: 'Tổng số tập', field: 'maxEpAsString', width: 100 },
        { headerName: 'Loại video', field: 'videoType', width: 100 },
        { headerName: 'Năm xuất bản', field: 'releaseYearASString', width: 100 },
        { headerName: 'Quốc gia', field: 'country', width: 100 },
        { headerName: 'Giới hạn', field: 'tag', width: 130 },
        { headerName: 'Đánh giá', field: 'rating', width: 120 },
        { headerName: 'Lượt xem', field: 'views', width: 120 },
        { headerName: 'Lượt thích', field: 'likes', width: 120 },


    ];
    return (
        <FilmManager title_name="Quản lý phim" colum={colum} sideFormInfo={sideMovieFormInfo}>
            {data}
        </FilmManager>
    );
}
