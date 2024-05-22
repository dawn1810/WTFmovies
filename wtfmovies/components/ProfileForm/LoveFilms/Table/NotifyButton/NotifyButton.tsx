import { NotificationsNone, NotificationsOffOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';

export default function NotifyButton({ notify }: { notify: boolean }) {
    const [notifyAvalable, setNotifyAvalable] = useState<boolean>(notify);

    const handleNotify = () => {
        setNotifyAvalable((prev) => !prev);
    };

    return (
        <IconButton onClick={handleNotify}>
            {notifyAvalable ? <NotificationsNone /> : <NotificationsOffOutlined />}
        </IconButton>
    );
}
