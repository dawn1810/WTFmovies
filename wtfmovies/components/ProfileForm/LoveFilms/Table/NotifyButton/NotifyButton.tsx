import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

export default function NotifyButton({ notify }: { notify: boolean }) {
    const [notifyAvalable, setNotifyAvalable] = useState<boolean>(notify);

    const handleNotify = () => {
        setNotifyAvalable((prev) => !prev);
    };

    return (
        <IconButton onClick={handleNotify}>
            {notifyAvalable ? <NotificationsNoneIcon /> : <NotificationsOffOutlinedIcon />}
        </IconButton>
    );
}
