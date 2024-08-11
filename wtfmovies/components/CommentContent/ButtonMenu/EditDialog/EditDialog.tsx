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
import { updateComment, updateReply } from '../../commentSlice';

export default function EditDialog({
    open,
    handleClose,
    commentInfo,
}: {
    open: boolean;
    handleClose: any;
    commentInfo: { senderEmail: string; commentId: string; content: string; parentId?: string };
}) {
    const dispatch = useDispatch();

    const { senderEmail, commentId, content, parentId } = commentInfo;
    const [value, setValue] = useState(content);

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: false }));
    };

    const handleChange = (event: any) => {
        setValue(event.target.value);
    };

    const handleEditComment = async () => {
        const newContent = value.replace(/\n/g, '<br/>');
        const response = await fetch(`/api/v1/comment/updateComment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                commentId,
                senderEmail,
                newContent,
            }),
        });

        if (response.ok) {
            if (parentId) dispatch(updateReply({ parentId, commentId, newContent }));
            else dispatch(updateComment({ commentId, newContent }));
            handleClose();
        } else if (response.status === 400) {
            showAlert('Cập nhật bình luận thất bại!', 'error');
        } else if (response.status === 401) {
            showAlert('Cập nhật bình luận không hợp lệ', 'error');
        } else if (response.status === 403) {
            dispatch(changeModalShow(true));
            showAlert('Xác thực thất bại, đăng nhập để thu hồi bình luận này', 'info');
        } else if (response.status === 500) {
            showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
        }
    };

    return (
        <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle>{'Chỉnh sửa nội dung của bạn'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    multiline
                    fullWidth
                    value={value}
                    name="email"
                    variant="outlined"
                    placeholder="Nội dung chỉnh sửa"
                    rows={3}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Huỷ</Button>
                <Button onClick={handleEditComment} autoFocus>
                    Cập nhật
                </Button>
            </DialogActions>
        </Dialog>
    );
}
