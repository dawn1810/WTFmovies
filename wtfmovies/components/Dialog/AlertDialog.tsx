'use client';
import style from './AlertDialog.module.scss';
import classNames from 'classnames/bind';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

const cx = classNames.bind(style);

export default function AlertDialog({
    listId,
    children,
    loading,
    title,
    open,
    handleClose,
}: {
    listId: any;
    loading: boolean;
    title: string;
    children: React.ReactNode;
    open: boolean;
    handleClose: (any: any) => any;
}) {

    return (
        <>
            <Dialog
                scroll="paper"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <div id={cx('alert-dialog-description')}>{children}</div>
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        loading={loading}

                        onClick={() => {
                            handleClose({ content: listId, status: true });
                        }}
                    >
                        Chấp nhận
                    </LoadingButton>
                    <Button
                        onClick={() => {
                            handleClose({ content: listId, status: false });
                        }}
                        autoFocus
                    >
                        Huỷ
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    );
}
