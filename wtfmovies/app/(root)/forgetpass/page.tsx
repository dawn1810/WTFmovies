'use client';
import classNames from 'classnames/bind';
import { useState } from 'react';

import style from './forgetpass.module.scss';
import OTP from '~/components/OtpForm/OtpForm';
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';

const cx = classNames.bind(style);

function ForgetPass() {
    const [otp, setOtp] = useState<string>('');
    const [page, setPage] = useState<number>(0);

    const renderPage = (page: number) => {
        switch (page) {
            case 0:
                return (
                    <Card className={cx('find-account')}>
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
                                className={cx('input')}
                            />
                        </CardContent>
                        <CardActions className={cx('action')}>
                            <Button variant="contained">Huỷ bỏ</Button>
                            <Button variant="contained">Tìm kiếm</Button>
                        </CardActions>
                    </Card>
                );
            case 1:
                return (
                    <Card className={cx('find-account')}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Chúng tôi sẽ gửi mã xác nhận vào mail
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                chúng tôi sẽ gửi mã xác nhận vào mail
                            </Typography>
                        </CardContent>
                        <CardActions className={cx('action')}>
                            <Button variant="contained">Huỷ bỏ</Button>
                            <Button variant="contained">Tiếp tục</Button>
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
