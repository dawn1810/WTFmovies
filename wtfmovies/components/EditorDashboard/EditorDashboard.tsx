'use client';
import classNames from 'classnames/bind';
import style from './EditorDashboard.module.scss';
import NumCard from './NumCard';
import TableCard from './TableCard';
import {
    FilmTopInterface,
    NumStatisticalInterfaceE,
    TopSixUserInfoInfterface,
} from '~/libs/interfaces';
import { calcViewChangeE, getDataByYearE, getDataCurrentYearE } from '~/libs/clientFunc';
import PieCard from './PieCard';
import * as XLSX from 'xlsx';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';

const cx = classNames.bind(style);




export default function EditorDashboard({
    numStatistical,
    hotFilmList,
    topSixUser,
}: {
    numStatistical: NumStatisticalInterfaceE[] | any;
    hotFilmList: FilmTopInterface;
    topSixUser: TopSixUserInfoInfterface[];
}) {
    const yearDataset = getDataCurrentYearE(numStatistical);
    console.log(yearDataset);

    const allTimeDataset = getDataByYearE(numStatistical);

    const views = calcViewChangeE(yearDataset, 'view');
    const likes = calcViewChangeE(yearDataset, 'likes');
    const eps = calcViewChangeE(yearDataset, 'eps');
    const handleDownload = async () => {
        const response = await fetch('http://localhost:3000/excelTemplate/generalStatisticalEditor.xlsx', {
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
        generalSheet[XLSX.utils.encode_cell({ c: 2, r: 2 })] = { v: likes.number || 0, t: 'n' };
        generalSheet[XLSX.utils.encode_cell({ c: 2, r: 3 })] = { v: likes.change || 0, t: 'n' };
        generalSheet[XLSX.utils.encode_cell({ c: 3, r: 2 })] = { v: eps.number || 0, t: 'n' };
        generalSheet[XLSX.utils.encode_cell({ c: 3, r: 3 })] = { v: eps.change || 0, t: 'n' };

        // current year data
        for (let i = 1; i <= 4; i++) {
            console.log(yearDataset.view[i - 1].data);

            generalSheet[XLSX.utils.encode_cell({ c: i, r: 7 })] = {
                v: yearDataset.view[i - 1].data || 0,
                t: 'n',
            };
            generalSheet[XLSX.utils.encode_cell({ c: i, r: 8 })] = {
                v: yearDataset.likes[i - 1].data || 0,
                t: 'n',
            };
            generalSheet[XLSX.utils.encode_cell({ c: i, r: 9 })] = {
                v: yearDataset.eps[i - 1].data || 0,
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
                v: allTimeDataset.likes[i - 1].data || 0,
                t: 'n',
            };
            generalSheet[XLSX.utils.encode_cell({ c: i, r: 16 })] = {
                v: allTimeDataset.eps[i - 1].data || 0,
                t: 'n',
            };
        }

        // top film
        const popularSheet = workbook.Sheets[workbook.SheetNames[1]]; // select second sheet

        if (hotFilmList) {
            for (let i = 0; i < 5; i++) {
                // top films
                console.log(hotFilmList);

                popularSheet[XLSX.utils.encode_cell({ c: 1, r: i + 2 })] = {
                    v: hotFilmList.all.views[i].name || '',
                    t: 's',
                };
                popularSheet[XLSX.utils.encode_cell({ c: 2, r: i + 2 })] = {
                    v: hotFilmList.all.views[i].likes || 0,
                    t: 'n',
                };
                popularSheet[XLSX.utils.encode_cell({ c: 3, r: i + 2 })] = {
                    v: hotFilmList.all.views[i].views || 0,
                    t: 'n',
                };
                popularSheet[XLSX.utils.encode_cell({ c: 4, r: i + 2 })] = {
                    v: hotFilmList.all.views[i].rating || 0,
                    t: 'n',
                };
            }
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
                key={'aaa'}
                url='/editor/comment'
                area="table1"
                title="Danh sách bình luận"
                rows={topSixUser}
                cols={['Username', 'Nội dung', 'Thời gian']}
            />
            <PieCard hotFilmList={hotFilmList} area="pie" />
            <Tooltip title="Xuất thống kê" placement="top">
                <Fab className={cx('fab')} color="primary" onClick={handleDownload}>
                    <FileDownloadOutlinedIcon />
                </Fab>
            </Tooltip>



        </div>
    );
}


