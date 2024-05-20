import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, TextField } from '@mui/material';
import { RowInterface } from '~/libs/interfaces';

import style from './EvaluateDialog.module.scss';
import { rowsSelector } from '~/redux/selectors';
import { changeRow } from '../evaluateSlise';

const cx = classNames.bind(style);

export default function EvaluateDialog({
    tabValue,
    dialogOpen,
    currentRow,
    dialogType,
    handleCloseDialog,
    handleChange,
}: {
    tabValue: string;
    dialogOpen: boolean;
    currentRow: number;
    dialogType: any;
    handleCloseDialog: any;
    handleChange: any;
}) {
    const dispatch = useDispatch();
    const rows = useSelector(rowsSelector);
    const row: RowInterface = rows[currentRow];

    return (
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>{dialogType.title}</DialogTitle>
            <DialogContent className={cx('dialog')}>
                {dialogType.type === 0 ? (
                    <>
                        <TextField autoFocus fullWidth multiline spellCheck="false" maxRows={5} label="Tên" value="" />
                        <TextField fullWidth type="number" label="Điểm tối đa" value={undefined} />
                    </>
                ) : (
                    <>
                        <TextField
                            autoFocus
                            fullWidth
                            multiline
                            spellCheck="false"
                            maxRows={5}
                            label="Tên"
                            value={rows[currentRow].name}
                        />
                        <TextField fullWidth type="number" label="Điểm tối đa" value={rows[currentRow].maxScore} />
                        {row.criteria &&
                            row.criteria.map((criteria, index) => (
                                <>
                                    <h4>{'Tiêu chí ' + (index + 1) + ':'}</h4>
                                    <TextField
                                        fullWidth
                                        multiline
                                        spellCheck="false"
                                        maxRows={5}
                                        label="Tên"
                                        value={criteria.name}
                                    />
                                    <TextField fullWidth type="number" label="Điểm tối đa" value={criteria.maxScore} />
                                </>
                            ))}
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Huỷ</Button>
                <Button onClick={handleCloseDialog}>Lưu</Button>
            </DialogActions>
        </Dialog>
    );
}
