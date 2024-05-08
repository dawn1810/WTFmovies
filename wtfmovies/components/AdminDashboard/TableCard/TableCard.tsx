import classNames from 'classnames/bind';
import { Card, CardActionArea, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

import style from './TableCard.module.scss';

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

export default function TableCard({ area, title, rows }: { area?: string; title: string; rows: any[] }) {
    return (
        <Card style={{ gridArea: area }}>
            <CardActionArea
                className={cx('card-area')}
                onClick={() => {
                    console.log('aaaa');
                }}
            >
                <h4 className={cx('card-title')}>{title}</h4>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell align="left">Họ và tên</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row" className={cx('email-cell')}>
                                    {row.email}
                                </TableCell>
                                <TableCell align="left" className={cx('name-cell')}>
                                    {row.name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardActionArea>
        </Card>
    );
}
