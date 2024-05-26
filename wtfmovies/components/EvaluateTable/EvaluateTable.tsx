'use client';

import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { SyntheticEvent, useEffect, useState } from 'react';
import {
    AlertColor,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { AddCircleOutline, Save } from '@mui/icons-material';

import style from './EvaluateTable.module.scss';
import { RowInterface } from '~/libs/interfaces';
import Row from './Row';
import EvaluateDialog from './EvaluateDialog';
import { rowsSelector } from '~/redux/selectors';
import { changeRow } from './evaluateSlise';
import { LoadingButton } from '@mui/lab';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';

const cx = classNames.bind(style);

export default function EvaluateTable({ evaluateList }: { evaluateList: RowInterface[] }) {
    const dispatch = useDispatch();
    const rows = useSelector(rowsSelector);

    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<{ title: string; type: number }>({ title: '', type: 0 });
    const [currentRow, setCurrentRow] = useState(0);

    useEffect(() => {
        dispatch(changeRow(evaluateList));
    }, []);

    const showAlert = (content: string, type: AlertColor) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

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

    // save table
    const handleSubmit = async () => {
        setLoading(true);
        const response = await fetch('/api/v1/evaluate/updateTable', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ table: rows }),
        });

        if (response.ok) {
            setLoading(false);
            showAlert('Đã lưu phiên bản bảng mới!', 'success');
        } else if (response.status === 400) {
            showAlert('Lưu bảng đánh giá thất bại!', 'error');
        } else if (response.status === 500) {
            showAlert('Lỗi lưu bảng đánh giá, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
        }
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
            <LoadingButton
                color="error"
                onClick={handleSubmit}
                loading={loading}
                loadingPosition="start"
                startIcon={<Save />}
                variant="contained"
                className={cx('save-btn')}
            >
                <span>Save</span>
            </LoadingButton>
            <EvaluateDialog
                dialogOpen={dialogOpen}
                currentRow={currentRow}
                dialogType={dialogType}
                handleCloseDialog={handleCloseDialog}
            />
        </div>
    );
}