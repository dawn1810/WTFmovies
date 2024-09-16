import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDebounce } from '~/hooks';
import { useDispatch } from 'react-redux';
//import { AlertColor } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

import style from '../Table.module.scss';
import EmailTemplate from '~/components/ManageReportTable/EmailTemplate';
import { showNotify } from '~/components/Notify/notifySlide';

const cx = classNames.bind(style);

function CurrentDialog({
    open,
    dialogData,
    handleClose,
}: {
    open: boolean;
    dialogData: { _id: string; parentId: string; email: string; username: string; content: string; time: string };
    handleClose: (event: any) => void;
}) {
    //alert
    // const dispatch = useDispatch();

    // const showAlert = (content: string, type: any) => {
    //     dispatch(showNotify({ content, type, open: true }));
    // };

    // const [loading, setLoading] = useState<boolean>(false);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
            <DialogTitle sx={{ m: 0, p: 2 }} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{'Chi tiết bình luận:'}</span>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <div>
                    <span style={{ opacity: 0.6 }}>ID:</span> {dialogData._id}
                </div>
                <div>
                    <span style={{ opacity: 0.6 }}>ParentID:</span> {dialogData.parentId}
                </div>
                <div>
                    <span style={{ opacity: 0.6 }}>Từ:</span> {dialogData.email}
                </div>
                <div>
                    <span style={{ opacity: 0.6 }}>Tên người dùng:</span> {dialogData.username}
                </div>
                <div>
                    <span style={{ opacity: 0.6 }}>Thời gian:</span> {dialogData.time}
                </div>
                <div>
                    <span style={{ opacity: 0.6 }}>Nội dung:</span>
                    <div style={{ marginLeft: '16px' }} dangerouslySetInnerHTML={{ __html: dialogData.content }} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CurrentDialog;
