import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { AlertColor, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { RowInterface } from '~/libs/interfaces';

import style from './EvaluateDialog.module.scss';
import { rowsSelector } from '~/redux/selectors';
import { changeRow } from '../evaluateSlise';
import { useState } from 'react';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';

const cx = classNames.bind(style);

export default function EvaluateDialog({
    dialogOpen,
    currentRow,
    dialogType,
    handleCloseDialog,
}: {
    dialogOpen: boolean;
    currentRow: number;
    dialogType: any;
    handleCloseDialog: any;
}) {
    const dispatch = useDispatch();
    const rows = useSelector(rowsSelector);
    const row: RowInterface = rows[currentRow];
    const [value, setValue] = useState({ name: '', maxScore: 0 });
    const [err, setErr] = useState({ nameErr: '', scoreErr: '' });

    //alert

    const showAlert = (content: string, type: AlertColor) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

    const handleChange = (event: any) => {
        setValue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleClose = () => {
        setValue({ name: '', maxScore: 0 });
        handleCloseDialog();
    };

    const handleAdd = async () => {
        if (value.name.length <= 0) setErr({ scoreErr: '', nameErr: 'Cần nhập tên tiêu chuẩn' });
        else if (value.maxScore === 0) setErr({ nameErr: '', scoreErr: 'Điểm tối đa cần lớn hơn 0' });
        else {
            setErr({ nameErr: '', scoreErr: '' });
            const newValue = { name: value.name, maxScore: value.maxScore };
            const response = await fetch('/api/v1/evaluate/addStandard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newValue),
            });

            if (response.ok) {
                const res = await response.json();
                dispatch(changeRow([...rows, { ...newValue, _id: res }]));
                setValue({ name: '', maxScore: 0 });
                handleCloseDialog();
            } else if (response.status === 400) {
                showAlert('Thêm tiêu chuẩn thất bại!', 'error');
            } else if (response.status === 500) {
                showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
            }
        }
    };

    const handleSave = async () => {
        const newValue = { name: value.name || row.name, maxScore: value.maxScore || row.maxScore };
        const response = await fetch('/api/v1/evaluate/updateStandard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newValue, id: row._id }),
        });

        if (response.ok) {
            dispatch(changeRow(rows.map((r, i) => (i === currentRow ? { ...r, ...newValue } : r))));
            setValue({ name: '', maxScore: 0 });
            handleCloseDialog();
        } else if (response.status === 400) {
            showAlert('Cập nhật tiêu chuẩn thất bại!', 'error');
        } else if (response.status === 500) {
            showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
        }
    };

    const handleDelete = async () => {
        const response = await fetch('/api/v1/evaluate/deleteStandard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: row._id }),
        });

        if (response.ok) {
            dispatch(changeRow(rows.filter((r, i) => i !== currentRow)));
            handleCloseDialog();
        } else if (response.status === 400) {
            showAlert('Xoá tiêu chuẩn thất bại!', 'error');
        } else if (response.status === 500) {
            showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
        }
    };

    return (
        <Dialog open={dialogOpen} onClose={handleClose}>
            <DialogTitle>{dialogType.title}</DialogTitle>
            <DialogContent className={cx('dialog')}>
                {dialogType.type === 0 ? (
                    <>
                        <TextField
                            error={!!err.nameErr}
                            fullWidth
                            multiline
                            spellCheck="false"
                            maxRows={5}
                            label="Tên"
                            helperText={err.nameErr}
                            name="name"
                            value={value.name}
                            onChange={handleChange}
                        />
                        <TextField
                            error={!!err.scoreErr}
                            fullWidth
                            type="number"
                            label="Điểm tối đa"
                            helperText={err.scoreErr}
                            name="maxScore"
                            value={value.maxScore}
                            onChange={handleChange}
                        />
                    </>
                ) : dialogType.type === 1 ? (
                    <>
                        <TextField
                            fullWidth
                            multiline
                            spellCheck="false"
                            maxRows={5}
                            label="Tên"
                            name="name"
                            value={value.name || row.name}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            type="number"
                            label="Điểm tối đa"
                            name="maxScore"
                            value={value.maxScore || row.maxScore}
                            onChange={handleChange}
                        />
                    </>
                ) : (
                    <p>{row.name}</p>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Huỷ</Button>
                <Button
                    onClick={() => {
                        dialogType.type === 0 ? handleAdd() : dialogType.type === 1 ? handleSave() : handleDelete();
                    }}
                >
                    {dialogType.type === 0 ? 'Thêm' : dialogType.type === 1 ? 'Cập nhật' : 'Xoá'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
