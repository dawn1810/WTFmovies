'use client';
import classNames from 'classnames/bind';

import style from './test.module.scss';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

const cx = classNames.bind(style);

function Test() {
    const [value, setValue] = useState(
        JSON.stringify(
            {
                playlistId: '',
                nameInput: '',
                describe: '',
                status: '',
                author: [],
                director: [],
                tag: '',
                country: '',
                actor: [],
                img: '',
                poster: '',
                genre: [],
                maxEp: 18,
            },
            null,
            2,
        ),
    );

    const handleChange = (event: any) => {
        setValue(event.target.value);
    };

    const handleSend = async () => {
        const response = await fetch('/api/v1/editor/youtubeUpload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: value,
        });

        if (response.ok) {
            const res = await response.json();
            console.log(res);
        } else if (response.status === 400) {
            console.log('Người dùng không tồn tại 🧐🧐🧐');
        } else if (response.status === 500) {
            console.log('Lỗi 🫤🫤🫤');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>YOUTUBE UPLOAD DEMO:</h1>
            <TextField
                autoFocus
                label="body"
                spellCheck={false}
                multiline
                fullWidth
                value={value}
                onChange={handleChange}
            />
            <Button variant="contained" className={cx('btn')} onClick={handleSend}>
                SEND
            </Button>
        </div>
    );
}

export default Test;
