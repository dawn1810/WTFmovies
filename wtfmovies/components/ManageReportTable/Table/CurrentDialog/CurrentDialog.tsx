import classNames from 'classnames/bind';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';

import style from '../Table.module.scss';
import EmailTemplate from '~/components/ManageReportTable/EmailTemplate';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(style);

function CurrentDialog({
    open,
    dialogType,
    dialogData,
    handleClose,
    handleReply,
    handleApprove,
}: {
    open: boolean;
    dialogType: boolean;
    dialogData: { id: string; type: string; from: string; content: string; time: string };
    handleClose: (event: any) => void;
    handleReply: (type: boolean) => void;
    handleApprove: (ids: string[]) => void;
}) {
    const [formValue, setFormValue] = useState(
        'Chúng tôi đã đọc và xem xét cẩn thận những báo cáo của bạn. Chúng tôi thấy được rằng đây là một vấn đề cần giải quyết và đã lên kế hoạch để giải quyết vấn đề mà bạn đã báo cáo.\n\nNhờ vào những báo cáo của bạn và cộng đồng webside của chúng tôi đã có thể phát triễn ngày càng tốt hơn và phù hợp hơn đối với cộng đồng. Thế nên chúng tôi sẽ liên hệ để gửi lời cảm ơn và phần quà đến bạn trong thời gian sớm nhất.',
    );

    const mailContent = useDebounce(formValue.replace(/\n/g, '<br/>'), 1000);

    const handleMailContentChange = (event: any) => {
        setFormValue(event.target.value);
    };

    const handleSendReply = async () => {
        try {
            const response = await fetch('/api/v1/sendMail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: dialogData.from,
                    content: mailContent,
                }),
            });

            if (response.ok) {
                alert('Phản hồi thành công 😎😎😎');
            }
        } catch (err) {
            console.log('có lỗi trong quá trình gửi mail');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
            <DialogTitle className={cx('dialog-title')}>
                <span>{dialogType ? 'Chi tiết báo cáo: ' : 'Mẫu phản hồi báo cáo: '}</span>
                <IconButton aria-label="delete" onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {dialogType ? (
                    <>
                        <div>
                            <span style={{ opacity: 0.6 }}>Type:</span> {dialogData.type}
                        </div>
                        <div>
                            <span style={{ opacity: 0.6 }}>From:</span> {dialogData.from}
                        </div>
                        <div>
                            <span style={{ opacity: 0.6 }}>Time:</span> {dialogData.time}
                        </div>
                        <div>
                            <span style={{ opacity: 0.6 }}>Content:</span>
                            <div
                                style={{ marginLeft: '16px' }}
                                dangerouslySetInnerHTML={{ __html: dialogData.content }}
                            />
                        </div>
                    </>
                ) : (
                    <div className={cx('mail-form')}>
                        <h4>Nội dung mail</h4>
                        <TextField
                            value={formValue}
                            minRows={8}
                            maxRows={8}
                            margin="dense"
                            multiline
                            fullWidth
                            onChange={handleMailContentChange}
                        />
                        <h4>Mẫu mail</h4>
                        <EmailTemplate userName="[Tên người nhận]" adminName="[Tên người gửi]" content={mailContent} />
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                {dialogType ? (
                    <>
                        <Button onClick={() => handleReply(false)}>PHẢN HỒI</Button>
                        <Button onClick={() => handleApprove([dialogData.id])} autoFocus>
                            DUYỆT
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => handleReply(true)}>TRỞ VỀ</Button>
                        <Button onClick={handleSendReply} autoFocus>
                            GỬI
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default CurrentDialog;
