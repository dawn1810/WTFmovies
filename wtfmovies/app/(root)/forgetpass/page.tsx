'use client';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import style from './forgetpass.module.scss';
import OTP from '~/components/OtpForm/OtpForm';
import { Avatar, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';

const cx = classNames.bind(style);

function ForgetPass() {
    const router = useRouter();
    const [otp, setOtp] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [userInfo, setUserInfo] = useState<any>({ email: '', avatar: '', name: '' });

    const handleNextPage = () => {
        setPage((prev) => (prev < 4 ? prev + 1 : prev));
    };

    const handlePrevPage = () => {
        setPage((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleUserEmailChange = (event: any) => {
        setUserInfo((prev: any) => ({ ...prev, email: event.target.value }));
    };

    const handleCancle = () => {
        router.push('/'); // back to home
    };

    const handleSearchUser = async () => {
        const response = await fetch('/api/v1/forgetpass/searchUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail: userInfo.email }),
        });

        if (response.ok) {
            const res = await response.json();
            setUserInfo(res);
            handleNextPage();
        } else if (response.status === 400) {
            alert('Người dùng không tồn tại 🧐🧐🧐');
        } else if (response.status === 500) {
            alert('Lỗi trong quá trình tìm kiếm, vui lòng thử lại 🫤🫤🫤');
        }
    };

    const handleSendOTP = async () => {
        const response = await fetch('/api/v1/sendOTP', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail: userInfo.email, userName: userInfo.name }),
        });

        if (response.ok) {
            handleNextPage();
        } else if (response.status === 400) {
            alert('Gửi mã đăng nhập thất bại 😭😭😭');
        } else if (response.status === 500) {
            alert('Lỗi trong quá trình gữi mã xác nhận, vui lòng thử lại 🫤🫤🫤');
        }
    };

    const renderPage = (page: number) => {
        switch (page) {
            case 0:
                return (
                    <Card className={cx('card')}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Tìm kiếm tài khoản của bạn
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Vui lòng nhập địa chỉ email hoặc số điện thoại di động để tìm kiếm tài khoản của bạn.
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Email hoặc số điện thoại"
                                variant="outlined"
                                value={userInfo.email}
                                className={cx('input')}
                                onChange={handleUserEmailChange}
                            />
                        </CardContent>
                        <CardActions className={cx('action')}>
                            <Button variant="contained" onClick={handleCancle}>
                                Huỷ bỏ
                            </Button>
                            <Button variant="contained" onClick={handleSearchUser}>
                                Tìm kiếm
                            </Button>
                        </CardActions>
                    </Card>
                );
            case 1:
                return (
                    <Card className={cx('card')}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Chúng tôi sẽ gửi mã xác nhận vào mail của bạn
                            </Typography>
                            <div className={cx('user-info')}>
                                <div className={cx('email')}>{userInfo.email}</div>
                                <Avatar alt="Remy Sharp" src={userInfo.avatar} sx={{ width: 56, height: 56 }} />
                                <div className={cx('name')}>{userInfo.name[0]}</div>
                            </div>
                        </CardContent>
                        <CardActions className={cx('action')}>
                            <Button variant="contained" onClick={handlePrevPage}>
                                Không phải bạn
                            </Button>
                            <Button variant="contained" onClick={handleSendOTP}>
                                Tiếp tục
                            </Button>
                        </CardActions>
                    </Card>
                );
            case 2:
                return <OTP separator={<span>-</span>} value={otp} onChange={setOtp} length={5} />;
        }
    };

    return <div className={cx('wrapper')}>{renderPage(page)}</div>;
}

export default ForgetPass;
