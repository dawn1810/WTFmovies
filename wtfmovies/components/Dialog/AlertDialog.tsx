"use client"
import { Fragment } from 'react';
import style from './AlertDialog.module.scss';
import classNames from 'classnames/bind';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { changeAlertStatus } from '../DataGridCom/dataGridComSlice';
const cx = classNames.bind(style);



export default function AlertDialog({ listId, children, title, open, handleClose }: {
    listId: any; title: string; children: React.ReactNode; open: boolean; handleClose: () => any
}) {
    const dispatch = useDispatch();

    return (
        <Fragment>
            <Dialog
                scroll='paper'
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <div id={cx("alert-dialog-description")}>
                        {children}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClose(); dispatch(changeAlertStatus({ content: listId, status: false })) }}>Huỷ</Button>
                    <Button onClick={() => { handleClose(); dispatch(changeAlertStatus({ content: listId, status: true })) }} autoFocus>
                        Chấp nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    );
}
