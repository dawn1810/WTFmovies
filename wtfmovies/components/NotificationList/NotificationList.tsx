'use client';
import classNames from 'classnames/bind';
import { useState } from 'react';
import {
    AlertColor,
    Avatar,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { Close, NotificationsNone } from '@mui/icons-material';

import style from './NotificationList.module.scss';
import { timePassed } from '~/libs/clientFunc';
import { useDispatch } from 'react-redux';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';
import { useRouter } from 'next/navigation';

const cx = classNames.bind(style);

function Notification({ notify }: { notify: any[] }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const showAlert = (content: string, type: AlertColor) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
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
                {notifications.map((note, index) => (
                    <ListItem
                        key={index}
                        className={cx('item')}
                        secondaryAction={
                            <IconButton edge="end" onClick={() => handleRemove(index)}>
                                <Close />
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={() => handleRedirect(index)}>
                            <ListItemAvatar>
                                <Avatar>
                                    <NotificationsNone />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={note.content} secondary={timePassed(note.time)} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default Notification;
