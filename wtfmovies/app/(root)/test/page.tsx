'use client';
import classNames from 'classnames/bind';

import style from './test.module.scss';
// //import { AlertColor } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';

const cx = classNames.bind(style);

function Test() {
    useEffect(() => {
        const socket = new WebSocket('wss://websocket.binhminh19112003.workers.dev');

        socket.onopen = () => {
            console.log('Connected to the WebSocket server');
            socket.send('Hello from client');
        };

        socket.onmessage = (event: any) => {
            console.log('Message received from server');
        };

        socket.onclose = () => {
            console.log('Disconnected from the WebSocket server');
        };

        return () => {
            socket.close();
        };
    }, []);

    // const dispatch = useDispatch();

    // const showAlert = (content: string, type: any) => {
    //     dispatch(changeNotifyContent(content));
    //     dispatch(changeNotifyType(type));
    //     dispatch(changeNotifyOpen(true));
    // };

    // const [value, setValue] = useState(
    //     JSON.stringify(
    //         {
    //             playlistId: '',
    //             nameInput: '',
    //             describe: '',
    //             status: '',
    //             author: [],
    //             director: [],
    //             tag: '',
    //             country: '',
    //             actor: [],
    //             img: '',
    //             poster: '',
    //             genre: [],
    //             maxEp: 18,
    //         },
    //         null,
    //         2,
    //     ),
    // );

    // const handleChange = (event: any) => {
    //     setValue(event.target.value);
    // };

    // const handleSend = async () => {
    //     const response = await fetch('/api/v1/editor/fetchEpYoutube', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: value,
    //     });

    //     // console.log(value);

    //     if (response.ok) {
    //         showAlert('Đăng tải phim thành công 😎😎😎', 'success');
    //     } else if (response.status === 400) {
    //         showAlert('Đăng tải phim thất bại, vui lòng thử lại 😞😞😞', 'info');
    //     } else if (response.status === 500) {
    //         const res = await response.text();
    //         showAlert(res, 'error');
    //     }
    // };

    // return (
    //     <div className={cx('wrapper')}>
    //         <h1 className={cx('title')}>YOUTUBE UPLOAD DEMO:</h1>
    //         <TextField
    //             autoFocus
    //             label="body"
    //             spellCheck={false}
    //             multiline
    //             fullWidth
    //             value={value}
    //             onChange={handleChange}
    //         />
    //         <Button variant="contained" className={cx('btn')} onClick={handleSend}>
    //             SEND
    //         </Button>
    //     </div>
    // );
    return <p style={{ color: 'white' }}>Hello world!</p>;
}

export default Test;
