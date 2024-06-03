'use client';
import classNames from 'classnames/bind';
import { AlertColor } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import LockResetIcon from '@mui/icons-material/LockReset';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import style from './forgetpass.module.scss';
import OTP from '~/components/OtpForm/OtpForm';
import { validatePassword } from '~/libs/clientFunc';
import PassInput from '~/components/PassInput';
import { useDispatch } from 'react-redux';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';

const cx = classNames.bind(style);

function ForgetPass() {
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: AlertColor) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

    const router = useRouter();
    const [page, setPage] = useState<number>(0);

    // user search
    const [userInfo, setUserInfo] = useState<any>({ email: '', avatar: '', name: '' });

    // otp
    const [otp, setOtp] = useState<string>('');
    const [count, setCount] = useState<number>(300);
    const [otpId, setOtpId] = useState<string>('');
    const [sendLoading, setSendLoading] = useState<boolean>(false);
    const [sendCount, setSendCount] = useState<number>(60);

    // change pass
    const [validated, setValidated] = useState({
        newPass: '',
        rnewPass: '',
    });
    const [info, setInfo] = useState({ newPass: '', rnewPass: '' });
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (count > 0) setCount((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [count]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (sendCount > 0) setSendCount((prev) => prev - 1);
            else setSendLoading(true);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [sendCount]);

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

    // user search
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
            showAlert('Người dùng không tồn tại 🧐🧐🧐', 'error');
        } else if (response.status === 500) {
            showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
        }
    };

    // otp
    const handleSendOTP = async () => {
        if (!userInfo.email || !userInfo.name) {
            const response = await fetch('/api/v1/otp/sendOTP', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail: userInfo.email, userName: userInfo.name }),
            });

            if (response.ok) {
                const res: string = await response.json();
                setOtpId(res);
                setCount(60);
                handleNextPage();
            } else if (response.status === 400) {
                showAlert('Gửi mã đăng nhập thất bại 😭😭😭', 'error');
            } else if (response.status === 401) {
                showAlert('Gửi mail thất bại 😭😭😭', 'error');
            } else if (response.status === 500) {
                showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
            }
        }
    };

    const handleSendAgainOTP = async () => {
        await handleSendOTP();
        setSendLoading(true);
        setSendCount(60);
        setCount(300);
    };

    const handleCheckOTP = async () => {
        const response = await fetch('/api/v1/otp/checkOTP', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ otp, otpId }),
        });

        if (response.ok) {
            const res: string = await response.json();
            setOtpId(res);
            handleNextPage();
        } else if (response.status === 400) {
            showAlert('Lưu mã đăng nhập thất bại 😭😭😭', 'error');
        } else if (response.status === 401) {
            showAlert('Mã đăng nhập không hợp lệ 😭😭😭', 'error');
        } else if (response.status === 500) {
            showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn ', 'error');
        }
    };

    // change password
    const handleInputChange = (event: any) => {
        setInfo((prev) => ({ ...prev, [event.target.name]: event.target.value }));
        setValidated((prev) => ({ ...prev, [event.target.name]: '' }));
    };

    const handleSubmit = async () => {
        if (validatePassword(info.newPass) !== 0) {
            switch (validatePassword(info.newPass)) {
                case 1:
                    setValidated({ rnewPass: '', newPass: 'Mật khẩu phải dài hơn 8 kí tự!' });
                    break;
                case 2:
                    setValidated({ rnewPass: '', newPass: 'Mật khẩu phải nhỏ hơn 50 kí tự!' });
                    break;
                case 3:
                    setValidated({ rnewPass: '', newPass: 'Mật khẩu không hợp lệ!' });
                    break;
                case 4:
                    setValidated({
                        rnewPass: '',
                        newPass: 'Mật khẩu phải bao gồm kí tự đặc biệt, chữ cái in thường, in hoa và chữ số!',
                    });
                    break;
                default:
                    setValidated({ newPass: 'Mật khẩu không hợp lệ', rnewPass: '' });
                    break;
            }
        } else if (info.rnewPass !== info.newPass) {
            setValidated({
                newPass: '',
                rnewPass: 'Mật khẩu nhập lại không trùng khớp',
            });
        } else {
            setLoading(true);
            const response = await fetch('/api/v1/forgetpass/changePass', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp, otpId, newPass: info.rnewPass }),
            });

            if (response.ok) {
                setInfo({ newPass: '', rnewPass: '' });
                showAlert('Thay đổi mật khẩu thành công', 'success');
            } else if (response.status === 400) {
                showAlert('Email không tồn tại', 'warning');
                setLoading(false);
            } else if (response.status === 401) {
                showAlert('Email không tồn tại', 'error');
                setLoading(false);
            } else if (response.status === 500) {
                showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
            }
            setLoading(false);
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
                                Không phải tôi
                            </Button>
                            <Button variant="contained" onClick={handleSendOTP}>
                                Tiếp tục
                            </Button>
                        </CardActions>
                    </Card>
                );
            case 2:
                return (
                    <Card className={cx('card')}>
                        <CardContent className={cx('otp-container')}>
                            <Typography gutterBottom variant="h5" component="div">
                                Nhập mã đăng nhập của bạn
                            </Typography>
                            <OTP separator={<span>-</span>} value={otp} length={5} onChange={setOtp} />
                            <LoadingButton
                                loading={sendLoading}
                                loadingPosition="start"
                                startIcon={<LockResetIcon />}
                                className={cx('btn')}
                                variant="text"
                                onClick={handleSendAgainOTP}
                            >
                                {sendLoading ? sendCount + 's' : 'Gửi lại'}
                            </LoadingButton>
                            <div className={cx('count')}>
                                {count !== 0 ? 'Hết hạn sau ' + count + 's' : 'Hết hạn 🥲🥲🥲'}
                            </div>
                        </CardContent>
                        <CardActions className={cx('action')}>
                            <Button variant="contained" onClick={handlePrevPage}>
                                Huỷ
                            </Button>
                            <Button variant="contained" onClick={handleCheckOTP}>
                                Tiếp tục
                            </Button>
                        </CardActions>
                    </Card>
                );
            case 3:
                return (
                    <Card className={cx('card')}>
                        <CardContent className={cx('otp-container')}>
                            <Typography gutterBottom variant="h5" component="div">
                                Thay đổi mật khẩu
                            </Typography>
                            <PassInput
                                label="Mật khẩu mới"
                                value={info.newPass}
                                placeholder="Enter new password"
                                helpText={validated.newPass}
                                inputName="newPass"
                                onChange={handleInputChange}
                            />
                            <PassInput
                                label="Nhập lại mật khẩu mới"
                                value={info.rnewPass}
                                placeholder="Enter new password again"
                                helpText={validated.rnewPass}
                                inputName="rnewPass"
                                onChange={handleInputChange}
                            />
                        </CardContent>
                        <CardActions className={cx('action')}>
                            <Button variant="contained" onClick={handlePrevPage}>
                                Huỷ
                            </Button>
                            <LoadingButton
                                loading={loading}
                                loadingPosition="start"
                                variant="contained"
                                startIcon={<SaveOutlinedIcon />}
                                className={cx('bottom-button')}
                                onClick={handleSubmit}
                            >
                                Thay đổi
                            </LoadingButton>
                        </CardActions>
                    </Card>
                );
        }
    };

    return <div className={cx('wrapper')}>{renderPage(page)}</div>;
}

export default ForgetPass;
