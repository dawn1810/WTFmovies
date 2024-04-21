import classNames from 'classnames/bind';
import { Button, Divider, MenuItem, Select, TextField } from '@mui/material';
import {
    AlternateEmailOutlined,
    CelebrationOutlined,
    PermIdentityOutlined,
    SaveOutlined,
    TransgenderOutlined,
} from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import style from '../UserInfo.module.scss';

const cx = classNames.bind(style);

function UserInfo({
    userInfoList,
}: {
    userInfoList: { email: string; name?: string; birthDate?: string; gender?: string };
}) {
    const userInfo = [
        {
            icon: <AlternateEmailOutlined />,
            tag: 'Email',
            input: (
                <TextField
                    disabled
                    className={cx('user-info-txt-input')}
                    id="standard-basic"
                    // label="Standard"
                    value={userInfoList.email}
                    variant="outlined"
                />
            ),
        },
        {
            icon: <PermIdentityOutlined />,
            tag: 'Họ và tên',
            input: (
                <TextField
                    className={cx('user-info-txt-input')}
                    id="standard-basic"
                    value={userInfoList.name}
                    variant="outlined"
                />
            ),
        },
        {
            icon: <TransgenderOutlined />,
            tag: 'Giới tính',
            input: (
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={0}
                    className={cx('user-info-txt-input')}
                    // label="Age"
                    // onChange={handleChange}
                >
                    <MenuItem value={0}>Nam</MenuItem>
                    <MenuItem value={1}>Nữ</MenuItem>
                    <MenuItem value={2}>Khác</MenuItem>
                </Select>
            ),
        },
        {
            icon: <CelebrationOutlined />,
            tag: 'Sinh nhật',
            input: (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        // label="Controlled picker"
                        value={dayjs(userInfoList.birthDate)}
                        className={cx('user-info-txt-input')}
                        // onChange={(newValue) => setValue(newValue)}
                    />
                </LocalizationProvider>
            ),
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <Divider textAlign="left" className={cx('divider')}>
                THÔNG TIN CÁ NHÂN
            </Divider>
            {userInfo.map((info, index) => (
                <div className={cx('user-info')} key={index}>
                    <div className={cx('user-info-tags')}>
                        {info.icon}
                        <span>{info.tag}</span>
                    </div>
                    {info.input}
                </div>
            ))}
            <Button disabled variant="contained" startIcon={<SaveOutlined />} className={cx('bottom-button')}>
                SAVE
            </Button>
        </div>
    );
}

export default UserInfo;
