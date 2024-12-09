'use client';
import classNames from 'classnames/bind';

import style from './AdminDashboard.module.scss';
import NumCard from './NumCard';
import BarCard from './BarCard';
import TableCard from './TableCard';
import PieCard from './PieCard';
import {
    FilmHotInterface,
    GenresDatasetInterface,
    GenresUserDatasetInterface,
    NumStatisticalInterface,
    TopSixUserInfoInfterface,
} from '~/libs/interfaces';
import { calcViewChange, getDataByYear, getDataCurrentYear } from '~/libs/clientFunc';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useDispatch } from 'react-redux';
import { showNotify } from '../Notify/notifySlide';
import * as XLSX from 'xlsx';

const cx = classNames.bind(style);

const series = [
    { dataKey: 'views', label: 'lượt xem', stack: 'total' },
    { dataKey: 'likes', label: 'lượt thích', stack: 'total' },
    { dataKey: 'rating', label: 'điểm đánh giá', stack: 'total' },
];

export default function AdminDashboard({
    numStatistical,
    hotFilmList,
    topSixUser,
    hotGenreList,
    newReports,
    topSearch,
}: {
    numStatistical: NumStatisticalInterface[] | any;
    hotFilmList: FilmHotInterface[];
    hotGenreList: FilmHotInterface[];
    topSixUser: TopSixUserInfoInfterface[];
    newReports: any[];
    topSearch: GenresDatasetInterface[];
}) {
    const yearDataset = getDataCurrentYear(numStatistical);
    const allTimeDataset = getDataByYear(numStatistical);

    const views = calcViewChange(yearDataset, 'view');
    const users = calcViewChange(yearDataset, 'user');
    const films = calcViewChange(yearDataset, 'film');

    const dataSearch: GenresUserDatasetInterface[] = topSearch.map((search, index) => {
        return {
            id: index,
            value: search.time,
            label: search.content,
        };
    });

    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: false }));
    };

    console.log(hotFilmList);
    console.log(hotGenreList);
    console.log(topSearch);

    const handleDownload = async () => {
        const response = await fetch('http://localhost:3001/excelTemplate/generalStatistical.xlsx', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });

        const excelData = await response.arrayBuffer();
        const workbook = XLSX.read(excelData, { type: 'array' });

        // General
        const generalSheet = workbook.Sheets[workbook.SheetNames[0]]; // select first sheet

        generalSheet[XLSX.utils.encode_cell({ c: 1, r: 2 })] = { v: views.number || 0, t: 'n' }; // Set cell value and type (string)
        generalSheet[XLSX.utils.encode_cell({ c: 1, r: 3 })] = { v: views.change || 0, t: 'n' };
        generalSheet[XLSX.utils.encode_cell({ c: 2, r: 2 })] = { v: users.number || 0, t: 'n' };
        generalSheet[XLSX.utils.encode_cell({ c: 2, r: 3 })] = { v: users.change || 0, t: 'n' };
        generalSheet[XLSX.utils.encode_cell({ c: 3, r: 2 })] = { v: films.number || 0, t: 'n' };
        generalSheet[XLSX.utils.encode_cell({ c: 3, r: 3 })] = { v: films.change || 0, t: 'n' };

        // current year data
        for (let i = 1; i <= 12; i++) {
            generalSheet[XLSX.utils.encode_cell({ c: i, r: 7 })] = {
                v: yearDataset.view[i - 1].data || 0,
                t: 'n',
            };
            generalSheet[XLSX.utils.encode_cell({ c: i, r: 8 })] = {
                v: yearDataset.user[i - 1].data || 0,
                t: 'n',
            };
            generalSheet[XLSX.utils.encode_cell({ c: i, r: 9 })] = {
                v: yearDataset.film[i - 1].data || 0,
                t: 'n',
            };
        }

        // alltime data
        for (let i = 1; i <= allTimeDataset.view.length; i++) {
            generalSheet[XLSX.utils.encode_cell({ c: i, r: 13 })] = {
                v: allTimeDataset.view[i - 1].time || 0,
                t: 'n',
            };
            generalSheet[XLSX.utils.encode_cell({ c: i, r: 14 })] = {
                v: allTimeDataset.view[i - 1].data || 0,
                t: 'n',
            };
            generalSheet[XLSX.utils.encode_cell({ c: i, r: 15 })] = {
                v: allTimeDataset.user[i - 1].data || 0,
                t: 'n',
            };
            generalSheet[XLSX.utils.encode_cell({ c: i, r: 16 })] = {
                v: allTimeDataset.film[i - 1].data || 0,
                t: 'n',
            };
        }

        // top film/search/genre
        const popularSheet = workbook.Sheets[workbook.SheetNames[1]]; // select second sheet

        for (let i = 0; i < 5; i++) {
            // top films
            popularSheet[XLSX.utils.encode_cell({ c: 1, r: i + 2 })] = {
                v: hotFilmList[i].name || '',
                t: 's',
            };
            popularSheet[XLSX.utils.encode_cell({ c: 2, r: i + 2 })] = {
                v: hotFilmList[i].likes || 0,
                t: 'n',
            };
            popularSheet[XLSX.utils.encode_cell({ c: 3, r: i + 2 })] = {
                v: hotFilmList[i].views || 0,
                t: 'n',
            };
            popularSheet[XLSX.utils.encode_cell({ c: 4, r: i + 2 })] = {
                v: hotFilmList[i].rating || 0,
                t: 'n',
            };

            // top genres
            popularSheet[XLSX.utils.encode_cell({ c: 1, r: i + 10 })] = {
                v: hotGenreList[i].name || '',
                t: 's',
            };
            popularSheet[XLSX.utils.encode_cell({ c: 2, r: i + 10 })] = {
                v: hotGenreList[i].likes || 0,
                t: 'n',
            };
            popularSheet[XLSX.utils.encode_cell({ c: 3, r: i + 10 })] = {
                v: hotGenreList[i].views || 0,
                t: 'n',
            };
            popularSheet[XLSX.utils.encode_cell({ c: 4, r: i + 10 })] = {
                v: hotGenreList[i].rating || 0,
                t: 'n',
            };

            // top search
            popularSheet[XLSX.utils.encode_cell({ c: 1, r: i + 18 })] = {
                v: topSearch[i].content || '',
                t: 's',
            };
            popularSheet[XLSX.utils.encode_cell({ c: 2, r: i + 18 })] = {
                v: topSearch[i].time || 0,
                t: 'n',
            };
        }

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element and trigger a download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'generalStatistical.xlsx';
        link.setAttribute('download', 'generalStatistical.xlsx'); // This sets the download attribute
        link.click();

        // Clean up the temporary URL
        window.URL.revokeObjectURL(url);
    };

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
                url="/admin/users"
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
            <PieCard area="pie" data={dataSearch} />
            <TableCard
                area="table2"
                title="Danh sách báo cáo"
                rows={newReports}
                url="/admin/report"
                cols={['Loại', 'Email', 'Thời gian']}
            />
            <Tooltip title="Xuất thống kê" placement="top">
                <Fab className={cx('fab')} color="primary" onClick={handleDownload}>
                    <FileDownloadOutlinedIcon />
                </Fab>
            </Tooltip>
        </div>
    );
}
