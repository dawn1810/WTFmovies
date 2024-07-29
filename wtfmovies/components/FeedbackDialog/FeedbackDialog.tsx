import SendIcon from '@mui/icons-material/Send';
// //import { AlertColor } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFbDialog } from '~/layouts/components/Header/headerSlice';
import { changeContent, changeOpen, changeType } from '~/components/Notify/notifySlide';
import { headerSelector } from '~/redux/selectors';

export default function FormDialog() {
    const dispatch = useDispatch();
    const state = useSelector(headerSelector);

    const [content, setContent] = useState('');
    const [violate, setViolate] = useState();

    const showAlert = (content: string, type: any) => {
        dispatch(changeContent(content));
        dispatch(changeType(type));
        dispatch(changeOpen(true));
    };

    const handleClose = () => {
        dispatch(changeFbDialog(false));
        setContent('');
        setViolate(undefined);
    };

    const handleContentChange = (event: any) => {
        setContent(event.target.value);
    };

    const handleRatioChange = (event: any) => {
        setViolate(event.target.value);
    };

    const handleSendFeedback = async () => {
        const response = await fetch('/api/v1/sendReport', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, type: state.fbDialogType }),
        });

        if (response.ok) {
            handleClose();
            showAlert('Ý kiến phản hồi của bạn đã được ghi nhận, Cảm ơn vì sự góp ý của bạn 😽😽😽!', 'success');
        } else if (response.status === 500) {
            showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
        }
    };

    const handleSendReport = async () => {
        const reportContent =
            'Báo cáo vi phạm ' + state.rpContent + '<br/>Nội dung: ' + violate + '<br/>Mô tả: ' + content;

        const response = await fetch('/api/v1/sendReport', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: reportContent, type: state.fbDialogType }),
        });

        if (response.ok) {
            handleClose();
            showAlert('Ý kiến phản hồi của bạn đã được ghi nhận, Cảm ơn vì sự góp ý của bạn 😽😽😽!', 'success');
        } else if (response.status === 500) {
            showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
        }
    };

    return (
        <Dialog open={state.fbDialog} onClose={handleClose}>
            <DialogTitle>{state.fbDialogType === 'feedback' ? 'Ý kiến phản hồi' : 'Báo cáo vi phạm'}</DialogTitle>
            <DialogContent style={{ minWidth: 500 }}>
                {state.fbDialogType === 'feedback' ? (
                    <>
                        <DialogContentText>{'Mô tả ý kiến phản hồi của bạn'}</DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            fullWidth
                            multiline
                            spellCheck={false}
                            value={content}
                            rows={5}
                            placeholder="Nhập nội dung ý kiến phản hồi của bạn"
                            onChange={handleContentChange}
                        />
                        <DialogContentText>
                            *Bạn có thể liện hệ với chúng tôi qua email <Link>support@wtfdev.xyz</Link>
                        </DialogContentText>
                    </>
                ) : (
                    <>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={violate}
                            name="radio-buttons-group"
                            onChange={handleRatioChange}
                        >
                            <FormControlLabel
                                value="Nội dung rác hoặc nội dung quảng cáo không mong muốn"
                                control={<Radio />}
                                label="Nội dung rác hoặc nội dung quảng cáo không mong muốn"
                            />
                            <FormControlLabel
                                value="Tài liệu khiêu dâm hoặc phim khiêu dâm"
                                control={<Radio />}
                                label="Tài liệu khiêu dâm hoặc phim khiêu dâm"
                            />
                            <FormControlLabel value="Xâm hại trẻ em" control={<Radio />} label="Xâm hại trẻ em" />
                            <FormControlLabel
                                value="Lời nói căm thù hoặc hình ảnh bạo lực"
                                control={<Radio />}
                                label="Lời nói căm thù hoặc hình ảnh bạo lực"
                            />
                            <FormControlLabel
                                value="Nội dung quảng bá chủ nghĩa khủng bố"
                                control={<Radio />}
                                label="Nội dung quảng bá chủ nghĩa khủng bố"
                            />
                            <FormControlLabel value={6} control={<Radio />} label="Nội dung quấy rối hoặc bắt nạt" />
                            <FormControlLabel
                                value="Nội dung gian lân/vi phạm gây hiểu lầm"
                                control={<Radio />}
                                label="Nội dung gian lân/vi phạm gây hiểu lầm"
                            />
                            <FormControlLabel
                                value="Thông tin sai lệch"
                                control={<Radio />}
                                label="Thông tin sai lệch"
                            />
                            <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
                        </RadioGroup>
                        <DialogContentText>{'Mô tả báo cáo của bạn nếu có'}</DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            fullWidth
                            multiline
                            spellCheck={false}
                            value={content}
                            rows={3}
                            placeholder="Nhập mô tả báo cáo của bạn"
                            onChange={handleContentChange}
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Huỷ</Button>
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={state.fbDialogType === 'feedback' ? handleSendFeedback : handleSendReport}
                >
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
}
