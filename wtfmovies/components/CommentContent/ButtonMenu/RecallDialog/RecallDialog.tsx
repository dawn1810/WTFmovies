import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { showNotify } from '~/components/Notify/notifySlide';
import { changeModalShow } from '~/layouts/components/Header/headerSlice';
import { removeCommentsById, removeReplyById, updateComment, updateReply } from '../../commentSlice';

export default function RecallDialog({
    open,
    handleClose,
    commentInfo,
}: {
    open: boolean;
    handleClose: any;
    commentInfo: { senderEmail: string; commentId: string; parentId?: string };
}) {
    const dispatch = useDispatch();

    const { senderEmail, commentId, parentId } = commentInfo;
    const [loading, setLoading] = useState(false);

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: false }));
    };

    const handleRecallComment = async () => {
        setLoading(true);
        const response = await fetch(`/api/v1/comment/recallComment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                commentId,
                senderEmail,
                parentId,
            }),
        });

        if (response.ok) {
            if (parentId) dispatch(removeReplyById({ parentId, commentId }));
            else dispatch(removeCommentsById(commentId));
        } else if (response.status === 400) {
            showAlert('Thu hồi bình luận thất bại!', 'error');
        } else if (response.status === 401) {
            showAlert('Thu hồi bình luận không hợp lệ', 'error');
        } else if (response.status === 403) {
            dispatch(changeModalShow(true));
            showAlert('Xác thực thất bại, đăng nhập để thu hồi bình luận này', 'info');
        } else if (response.status === 500) {
            showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
        }
        handleClose();
        setLoading(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{'Bạn có muốn thu hồi bình luận này?'}</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Huỷ</Button>
                <Button disabled={loading} variant="contained" autoFocus onClick={handleRecallComment}>
                    Thu hồi
                </Button>
            </DialogActions>
        </Dialog>
    );
}
