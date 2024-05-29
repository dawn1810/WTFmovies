import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { AlertColor, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { CriteriaInterface, RowInterface } from '~/libs/interfaces';

import style from './RowDialog.module.scss';
import { rowsSelector } from '~/redux/selectors';
import { changeRow } from '~/components/EvaluateTable/evaluateSlise';
import { useState } from 'react';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';

const cx = classNames.bind(style);

export default function EvaluateDialog({
    dialogOpen,
    currentRow,
    currentCriteria,
    dialogType,
    handleCloseDialog,
}: {
    dialogOpen: boolean;
    currentRow: number;
    currentCriteria: number;
    dialogType: any;
    handleCloseDialog: any;
}) {
    const dispatch = useDispatch();
    const rows = useSelector(rowsSelector);
    const row: CriteriaInterface[] = rows[currentRow].criteria || [{}];
    const criteria: CriteriaInterface = row[currentCriteria];

    const [value, setValue] = useState({ name: '', maxScore: 0 });
    const [err, setErr] = useState({ nameErr: '', scoreErr: '' });

    const handleChange = (event: any) => {
        setValue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleClose = () => {
        setValue({ name: '', maxScore: 0 });
        handleCloseDialog();
    };

    const handleAdd = async () => {
        // console.log('aaa');

        const newValue = { name: value.name || criteria.name, maxScore: value.maxScore || criteria.maxScore };

        dispatch(
            changeRow(
                rows.map((r, index) => {
                    if (index === currentRow)
                        if (r.criteria)
                            return {
                                ...r,
                                criteria: [...r.criteria, newValue],
                            };
                        else
                            return {
                                ...r,
                                criteria: [newValue],
                            };
                    else return r;
                }),
            ),
        );
        setValue({ name: '', maxScore: 0 });
        handleCloseDialog();
    };

    const handleSave = async () => {
        const newValue = { name: value.name || criteria.name, maxScore: value.maxScore || criteria.maxScore };
        dispatch(
            changeRow(
                rows.map((r, index) => {
                    if (index === currentRow)
                        return {
                            ...r,
                            criteria: r.criteria.map((c, i) => (i === currentCriteria ? { ...c, ...newValue } : c)),
                        };
                    else return r;
                }),
            ),
        );
        setValue({ name: '', maxScore: 0 });
        handleCloseDialog();
    };

    const handleDelete = async () => {
        dispatch(
            changeRow(
                rows.map((r, index) => {
                    if (index === currentRow)
                        return { ...r, criteria: r.criteria.filter((c, i) => i !== currentCriteria) };
                    else return r;
                }),
            ),
        );
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
                            value={value.name || criteria.name}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            type="number"
                            label="Điểm tối đa"
                            name="maxScore"
                            value={value.maxScore || criteria.maxScore}
                            onChange={handleChange}
                        />
                    </>
                ) : (
                    <p>{criteria ? criteria.name : ''}</p>
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
