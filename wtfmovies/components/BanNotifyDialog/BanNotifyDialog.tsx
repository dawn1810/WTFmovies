import SendIcon from '@mui/icons-material/Send';
// //import { AlertColor } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
// import LinearProgress from '@mui/material/LinearProgress';
// import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

export default function BanNotify({ open, unBanDate }: { open: boolean; unBanDate: string }) {
    // const [progress, setProgress] = useState(0);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         if (progress === 100) {
    //             signOut;
    //         } else {
    //             setProgress((prev) => prev + 1);
    //         }
    //     }, 100);

    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []);

    return (
        <Dialog onClose={() => signOut()} aria-labelledby="customized-dialog-title" open={open}>
            {/* <LinearProgress variant="determinate" value={progress} /> */}
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Bạn đã bị cấm!
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => signOut()}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Bạn đã vi phạm một số quy tắc cộng đồng của WTFmovies nên chúng tôi buộc phải đã ra lệnh cấm thích
                    hợp cho bạn.
                </Typography>
                <Typography gutterBottom>
                    Lệnh cấm này có hiệu lực đến {unBanDate}. Hãy quay lại khi lệnh cấm của bạn kết thúc.
                </Typography>
                <Typography gutterBottom>Cảm ơn vì bạn đã đọc hết thông báo.</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => signOut()}>Đã hiểu</Button>
            </DialogActions>
        </Dialog>
    );
}
