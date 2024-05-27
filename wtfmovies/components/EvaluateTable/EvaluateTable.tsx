'use client';

import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
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
    TextField,
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

const calcFinalTotal = (rows: RowInterface[]) => {
    let total = 0;
    rows.forEach((row) => {
        total += row && row.criteria ? row.criteria.reduce((sum, currCriteria) => sum + +currCriteria.maxScore, 0) : 0;
    });
    return total;
};

const checkCondition = (rows: RowInterface[]) => {
    let total = calcFinalTotal(rows);
    return total === 100 && rows.length === 10;
};

export default function EvaluateTable({ evaluateList, ver }: { evaluateList?: RowInterface[]; ver: string }) {
    const dispatch = useDispatch();
    const rows = useSelector(rowsSelector);

    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<{ title: string; type: number }>({ title: '', type: 0 });
    const [currentRow, setCurrentRow] = useState(0);
    const [version, setVersion] = useState(ver);

    useEffect(() => {
        dispatch(changeRow(evaluateList || []));
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

    const handleChangeVersion = (event: any) => {
        setVersion(event.target.value);
    };

    // save table
    const handleSubmit = async () => {
        setLoading(true);

        if (checkCondition(rows)) {
            const response = await fetch('/api/v1/evaluate/updateTable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ table: rows, version }),
            });

            if (response.ok) {
                showAlert('Đã lưu phiên bản bảng mới!', 'success');
            } else if (response.status === 400) {
                showAlert('Lưu bảng đánh giá thất bại!', 'error');
            } else if (response.status === 500) {
                showAlert('Lỗi lưu bảng đánh giá, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
            }
        } else {
            showAlert('Bảng chưa đạt chuẩn!', 'warning');
        }

        setLoading(false);
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title_name')}>{'Quản lý bảng đánh giá hội viên'}</h1>
            <TextField
                style={{ alignSelf: 'flex-end' }}
                label="Version"
                variant="outlined"
                value={version}
                onChange={handleChangeVersion}
            />
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
                        {rows &&
                            rows.map((row, index) => (
                                <Row
                                    row={row}
                                    index={index}
                                    handleCloseDialog={handleCloseDialog}
                                    handleOpenDialog={handleOpenDialog}
                                    handleUpdateStandard={handleUpdateStandard}
                                    handleDeleteStandard={handleDeleteStandard}
                                />
                            ))}
                        <TableRow key={'total'}>
                            <TableCell />
                            <TableCell />
                            <TableCell>Tổng điểm:</TableCell>
                            <TableCell align="center">{calcFinalTotal(rows)}</TableCell>
                            <TableCell />
                        </TableRow>
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
