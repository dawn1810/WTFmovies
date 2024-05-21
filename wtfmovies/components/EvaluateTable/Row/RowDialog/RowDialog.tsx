import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { CriteriaInterface, RowInterface } from '~/libs/interfaces';

import style from './RowDialog.module.scss';
import { rowsSelector } from '~/redux/selectors';
import { changeRow } from '~/components/EvaluateTable/evaluateSlise';
import { useState } from 'react';

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
    const handleAdd = async () => {)
    // const handleAdd = async () => {
    //     if (value.name.length <= 0) setErr({ scoreErr: '', nameErr: 'Cần nhập tên tiêu chuẩn' });
    //     else if (value.maxScore === 0) setErr({ nameErr: '', scoreErr: 'Điểm tối đa cần lớn hơn 0' });
    //     else {
    //         setErr({ nameErr: '', scoreErr: '' });
    //         const newValue = { name: value.name, maxScore: value.maxScore };
    //         const response = await fetch('/api/v1/evaluate/addCriteria', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ ...newValue, _id: rows[currentRow]._id }),
    //         });

    //         if (response.ok) {
    //             const res = await response.json();
    //             dispatch(
    //                 changeRow(
    //                     rows.map((r, index) => {
    //                         if (index === currentRow) return { ...r, criteria: [...row, { ...newValue, _id: res }] };
    //                         else row;
    //                     }),
    //                 ),
    //             );
    //             setValue({ name: '', maxScore: 0 });
    //             handleCloseDialog();
    //         } else if (response.status === 400) {
    //             alert('Thêm tiêu chuẩn thất bại!');
    //         } else if (response.status === 500) {
    //             alert('Lỗi trong quá trình thêm tiêu chuẩn!');
    //         }
    //     }
    // };

    const handleSave = async () => {
        const newValue = { name: value.name || criteria.name, maxScore: value.maxScore || criteria.maxScore };
        const response = await fetch('/api/v1/evaluate/updateCriteria', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newValue, id: rows[currentRow]._id }),
        });

        if (response.ok) {
            dispatch(changeRow(rows.map((c, i) => (i === currentCriteria ? { ...c, ...newValue } : r))));
            setValue({ name: '', maxScore: 0 });
            handleCloseDialog();
        } else if (response.status === 400) {
            alert('Cập nhật tiêu chuẩn thất bại!');
        } else if (response.status === 500) {
            alert('Lỗi trong quá trình cập nhật tiêu chuẩn!');
        }
    };

    const handleDelete = async () => {
        const response = await fetch('/api/v1/evaluate/deleteCriteria', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: rows[currentRow]._id, name: value.name || criteria.name }),
        });

        if (response.ok) {
            dispatch(
                changeRow(
                    rows.map((r, index) => {
                        if (index === currentRow)
                            return { ...r, criteria: r.criteria.filter((c, i) => i !== currentCriteria) };
                        else row;
                    }),
                ),
            );
            handleCloseDialog();
        } else if (response.status === 400) {
            alert('Xoá tiêu chuẩn thất bại!');
        } else if (response.status === 500) {
            alert('Lỗi trong quá trình xoá tiêu chuẩn!');
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
