'use client';

import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

import style from './EvaluateTable.module.scss';
import { RowInterface } from '~/libs/interfaces';
import Row from './Row';
import EvaluateDialog from './EvaluateDialog';
import { rowsSelector } from '~/redux/selectors';
import { changeRow } from './evaluateSlise';

const cx = classNames.bind(style);

export default function EvaluateTable({ evaluateList }: { evaluateList: RowInterface[] }) {
    const dispatch = useDispatch();
    const rows = useSelector(rowsSelector);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<{ title: string; type: number }>({ title: '', type: 0 });
    const [currentRow, setCurrentRow] = useState(0);

    useEffect(() => {
        dispatch(changeRow(evaluateList));
    }, []);

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleOpenDialog = (title: string, type: number = 0) => {
        setDialogType({ title, type });
        setDialogOpen(true);
    };
    const handleUpdateStandard = (index: number) => {
        setDialogType({ title: 'Cập nhật tiêu chuẩn', type: 1 });
        setCurrentRow(index);
        setDialogOpen(true);
    };

    const handleDeleteStandard = (index: number) => {
        setDialogType({ title: 'Xoá tiêu chuẩn', type: 2 });
        setCurrentRow(index);
        setDialogOpen(true);
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title_name')}>{'Quản lý đánh giá hội viên'}</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow hover>
                            <TableCell width={10} />
                            <TableCell width={10} align="center">
                                STT
                            </TableCell>
                            <TableCell>Tiêu chuẩn</TableCell>
                            <TableCell width={10} align="center">
                                Điểm
                            </TableCell>
                            <TableCell width={200} align="center">
                                Thao tác
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <Row
                                row={row}
                                index={index}
                                handleCloseDialog={handleCloseDialog}
                                handleOpenDialog={handleOpenDialog}
                                handleUpdateStandard={handleUpdateStandard}
                                handleDeleteStandard={handleDeleteStandard}
                            />
                        ))}
                        <TableRow key={'new'} hover onClick={() => handleOpenDialog('Thêm tiêu chuẩn mới')}>
                            <TableCell />
                            <TableCell />
                            <TableCell align="center">
                                <Button
                                    startIcon={<AddCircleOutline />}
                                    onClick={() => handleOpenDialog('Thêm tiêu chuẩn mới')}
                                >
                                    Thêm tiêu chuẩn mới
                                </Button>
                            </TableCell>
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <EvaluateDialog
                dialogOpen={dialogOpen}
                currentRow={currentRow}
                dialogType={dialogType}
                handleCloseDialog={handleCloseDialog}
            />
        </div>
    );
}
