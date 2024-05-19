'use client';
import classNames from 'classnames/bind';
import { KeyboardArrowDown, KeyboardArrowUp, Update } from '@mui/icons-material';
import {
    Box,
    Button,
    Collapse,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';

import style from './EvaluateTable.module.scss';

const cx = classNames.bind(style);

interface criteriaInterface {
    content: string;
    maxScore: number;
}

function createData(index: number, name: string, maxScore: number, criteria: criteriaInterface[]) {
    return {
        index,
        name,
        maxScore,
        criteria,
    };
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell onClick={() => alert('😎😎😎')}>{row.index}</TableCell>
                <TableCell onClick={() => alert('😎😎😎')}>{row.name}</TableCell>
                <TableCell onClick={() => alert('😎😎😎')}>{row.maxScore}</TableCell>
                {/* <TableCell align="center">
                    <IconButton onClick={() => alert('change')}>
                        <Update />
                    </IconButton>
                </TableCell> */}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Tiêu chí đánh giá
                            </Typography>
                            <Table aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nội dung</TableCell>
                                        <TableCell>Điểm</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.criteria.map((criteriaRow) => (
                                        <TableRow key={criteriaRow.content} hover onClick={() => alert('😎😎😎')}>
                                            <TableCell>{criteriaRow.content}</TableCell>
                                            <TableCell>{criteriaRow.maxScore}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

const rows = [
    createData(1, 'Chấp hành nội quy cộng đồng', 10, [
        {
            content: 'Tuân thủ nội quy trang web',
            maxScore: 5,
        },
        {
            content: 'Có ý thức trong trao đỗi và bình luận',
            maxScore: 5,
        },
    ]),
    createData(2, 'Chấp hành nội quy cộng đồng', 10, [
        {
            content: 'Tuân thủ nội quy trang web',
            maxScore: 5,
        },
        {
            content: 'Có ý thức trong trao đỗi và bình luận',
            maxScore: 5,
        },
    ]),
    createData(3, 'Chấp hành nội quy cộng đồng', 10, [
        {
            content: 'Tuân thủ nội quy trang web',
            maxScore: 5,
        },
        {
            content: 'Có ý thức trong trao đỗi và bình luận',
            maxScore: 5,
        },
    ]),
];

export default function EvaluateTable() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title_name')}>{'Quản lý đánh giá hội viên'}</h1>
            <TableContainer component={Paper} className={cx('container')}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>STT</TableCell>
                            <TableCell>Tiêu Chuẩn</TableCell>
                            <TableCell>Điểm</TableCell>
                            {/* <TableCell /> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
