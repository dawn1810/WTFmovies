import classNames from 'classnames/bind';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
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
import { LoadingButton } from '@mui/lab';
import AvatarUpload from '../AvatarUpload';

const cx = classNames.bind(style);

function deepEqual(object1: any, object2: any): boolean {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (!keys2.includes(key) || object1[key] !== object2[key]) {
            return false;
        }
    }

    return true;
}

function UserInfo({
    avatar,
    userInfoList,
}: {
    avatar?: string;
    userInfoList: { email?: string; name?: string; birthDate?: string; gender?: number };
}) {
    const { data: session, update } = useSession();

    const initialInfo: { name?: string; birthDate?: string; gender?: number } = {
        name: userInfoList.name,
        gender: userInfoList.gender,
        birthDate: userInfoList.birthDate,
    };
    const [info, setInfo] = useState(initialInfo);

    const [canSave, setCanSave] = useState(true);
    const [loading, setLoading] = useState(false);
    const [avatarImage, setAvatarImage] = useState<string | undefined>(avatar);
    const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);

    useEffect(() => {
        if (!deepEqual(info, initialInfo) || !!avatarFile) setCanSave(false);
        else setCanSave(true);
    }, [info, avatarFile]);

    const handleInputChange = (event: any) => {
        setInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleDateChange = (newValue: any) => {
        setInfo((prev: any) => ({ ...prev, birthDate: newValue }));
    };

    const handleSave = async () => {
        setLoading(true);
        // send file to server
        if (avatarFile) {
            const file_blob = new Blob([avatarFile], { type: 'image/png' });
            const formData = new FormData();
            formData.append('image', file_blob);
            formData.append('info', JSON.stringify(info));

            const response = await fetch('/api/v1/profile/updateInfo', {
                method: 'POST',
                // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData,
            });

            if (response.ok) {
                const res = await response.json();
                setLoading(false);
                setCanSave(false);
                alert('Cập nhật thông tin thành công!');

                update({ user: { ...session?.user, avatar: res } });
            } else if (response.status === 400) {
                setInfo(initialInfo);
                alert('Cập nhật không thành công!');
            } else {
                setInfo(initialInfo);
                alert('Cập nhật không thành công!');
            }
        }
    };

    const handleChangeAvatar = async (event: any) => {
        const file = event.target.files[0];
        setAvatarFile(file);
        setAvatarImage(URL.createObjectURL(file));
    };

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
                    value={info.name}
                    variant="outlined"
                    name="name"
                    onChange={handleInputChange}
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
                    value={info.gender}
                    className={cx('user-info-txt-input')}
                    name="gender"
                    onChange={handleInputChange}
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
                        value={dayjs(info.birthDate)}
                        className={cx('user-info-txt-input')}
                        name="birthDate"
                        onChange={handleDateChange}
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
            <AvatarUpload avatarImage={avatarImage} handleChange={handleChangeAvatar} />
            <div className={cx('container')}>
                {userInfo.map((info, index) => (
                    <div className={cx('user-info')} key={index}>
                        <div className={cx('user-info-tags')}>
                            {info.icon}
                            <span>{info.tag}</span>
                        </div>
                        {info.input}
                    </div>
                ))}
                <LoadingButton
                    loading={loading}
                    disabled={canSave}
                    variant="contained"
                    startIcon={<SaveOutlined />}
                    className={cx('bottom-button')}
                    onClick={handleSave}
                >
                    SAVE
                </LoadingButton>
            </div>
        </div>
    );
}

export default UserInfo;
