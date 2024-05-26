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
    const [value, setValue] = useState({ name: '' });
    const [err, setErr] = useState({ nameErr: '', scoreErr: '' });

    const handleChange = (event: any) => {
        setValue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleClose = () => {
        setValue({ name: '' });
        handleCloseDialog();
    };

    const handleAdd = async () => {
        const newValue = { name: value.name };

        dispatch(changeRow([...rows, { ...newValue }]));
        setValue({ name: '' });
        handleCloseDialog();
    };

    const handleSave = async () => {
        const newValue = { name: value.name || row.name };

        dispatch(changeRow(rows.map((r, i) => (i === currentRow ? { ...r, ...newValue } : r))));
        setValue({ name: '' });
        handleCloseDialog();
    };

    const handleDelete = async () => {
        dispatch(changeRow(rows.filter((r, i) => i !== currentRow)));
        handleCloseDialog();
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
