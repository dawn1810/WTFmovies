'use client';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
//import { AlertColor } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import style from './NotificationList.module.scss';
import { timePassed } from '~/libs/clientFunc';
import { useDispatch } from 'react-redux';
import { showNotify } from '~/components/Notify/notifySlide';

const cx = classNames.bind(style);

function Notification({ notify }: { notify: any[] }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: true }));
    };

    const [notifications, setNotifications] = useState(notify);

    const handleRemove = async (index: number) => {
        const curr = notifications;
        setNotifications((prev) => prev.filter((a, i) => i !== index));
        const response = await fetch('/api/v1/notify/removeNotify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notifyId: notify[index].notifyId }),
        });

        if (response.status === 400) {
            setNotifications(curr);
            showAlert('Gở thông báo thất bại!', 'error');
        } else if (response.status === 500) {
            setNotifications(curr);
            showAlert('Lỗi gỡ thông báo, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
        }
    };

    const handleRedirect = (index: number) => {
        if (notify[index].link) router.push(notify[index].link);
        else return;
    };

    return (
        <div className={cx('list-film')}>
            <Divider textAlign="left" className={cx('divider')}>
                DANH SÁCH THÔNG BÁO
            </Divider>
            <List className={cx('list-item')}>
                {notifications.length > 0 ? (
                    notifications.map((note, index) => (
                        <ListItem
                            key={index}
                            className={cx('item')}
                            secondaryAction={
                                <IconButton edge="end" onClick={() => handleRemove(index)}>
                                    <CloseIcon />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={() => handleRedirect(index)}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <NotificationsNoneIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={note.content} secondary={timePassed(note.time)} />
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    <div className={cx('empty-list')}>Danh sách thông báo trống</div>
                )}
            </List>
        </div>
    );
}

export default Notification;
