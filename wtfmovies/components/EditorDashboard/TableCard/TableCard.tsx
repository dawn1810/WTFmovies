import classNames from 'classnames/bind';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { useRouter } from 'next/navigation';

import style from './TableCard.module.scss';
import { timePassed } from '~/libs/clientFunc';

const cx = classNames.bind(style);

// function createData(email: string, name: string) {
//     return { email, name };
// }

// const rows = [
//     createData('nguyenvana@gmail.com', 'Nguyễn Văn A'),
//     createData('nguyenvanbb18102003@gmail.com', 'Nguyễn Thị B'),
//     createData('qwertyuioplkjhgfdsazxcvbnm123456789@gmail.com', 'Nguyễn Trần Chí C'),
//     createData('nguyenvana@gmail.com', 'Nguyễn Văn Thị Hà D'),
//     createData('nguyenvana@gmail.com', 'Nguyễn Trần Hoàng Na E'),
// ];

export default function TableCard({
    area,
    title,
    rows,
    url,
    cols,
}: {
    area?: string;
    title: string;
    rows: any[];
    url: string;
    cols: string[];
}) {
    const router = useRouter();

    return (
        <Card style={{ gridArea: area }}>
            <CardActionArea
                className={cx('card-area')}
                key={'aa'}
                onClick={() => {
                    router.push(url);
                }}
            >
                <h4 className={cx('card-title')}>{title}</h4>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {cols.map((col) => (
                                <TableCell>{col}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) =>
                            <TableRow key={row._id}>

                                {row.username && (
                                    <TableCell component="th" scope="row" className={cx('table-cell')}>
                                        {row.username}
                                    </TableCell>
                                )}
                                <TableCell component="th" scope="row" className={cx('table-cell')}>
                                    {row.content}
                                </TableCell>
                                <TableCell align="left" className={cx('table-cell')}>
                                    {timePassed(row.time)}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardActionArea>
        </Card>
    );
}
