import classNames from 'classnames/bind';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
//import { AlertColor } from '@mui/material';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import TransgenderOutlinedIcon from '@mui/icons-material/TransgenderOutlined';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import style from '../UserInfo.module.scss';
import { LoadingButton } from '@mui/lab';
import AvatarUpload from '../AvatarUpload';
import { useDispatch } from 'react-redux';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';

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
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

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
        const file_blob = avatarFile ? new Blob([avatarFile], { type: 'image/png' }) : undefined;

        const formData = new FormData();
        if (!!file_blob) formData.append('image', file_blob);
        formData.append('info', JSON.stringify(info));

        const response = await fetch('/api/v1/profile/updateInfo', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const res = await response.json();
            setLoading(false);
            setCanSave(false);
            showAlert('Cập nhật thông tin thành công!', 'success');

            if (res !== 'Không cập nhật hình') update({ user: { ...session?.user, avatar: res } });
        } else if (response.status === 400) {
            setInfo(initialInfo);
            showAlert('Cập nhật không thành công!', 'error');
        } else {
            setInfo(initialInfo);
            showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error'); // cho các lỗi 500
        }
    };

    const handleChangeAvatar = async (event: any) => {
        const file = event.target.files[0];
        setAvatarFile(file);
        setAvatarImage(URL.createObjectURL(file));
    };

    const userInfo = [
        {
            icon: <AlternateEmailOutlinedIcon />,
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
            icon: <PermIdentityOutlinedIcon />,
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
            icon: <TransgenderOutlinedIcon />,
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
            icon: <CelebrationOutlinedIcon />,
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
                    startIcon={<SaveOutlinedIcon />}
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
