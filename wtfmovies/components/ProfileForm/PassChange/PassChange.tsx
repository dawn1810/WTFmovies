import classNames from 'classnames/bind';

import style from '~/components/ProfileForm/ProfileInfo/UserInfo.module.scss';
import { Button, Divider, IconButton, InputAdornment, TextField } from '@mui/material';
import { SaveOutlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useState } from 'react';

const cx = classNames.bind(style);

const PassInput = ({
    label,
    placeholder,
    value,
    helpText,
}: {
    label: string;
    placeholder: string;
    value?: string;
    helpText?: string;
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className={cx('user-info')}>
            <div className={cx('user-info-tags')}>
                <span>{label}</span>
            </div>
            <TextField
                className={cx('user-info-txt-input')}
                value={value}
                placeholder={placeholder}
                type={showPassword ? 'text' : 'password'}
                helperText={helpText}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

function PassChange() {
    const [newValidated, setnewValidated] = useState('');
    const [oldValidated, setOldValidated] = useState('');
    const [rnewValidated, setRnewValidated] = useState('');
    const [info, setInfo] = useState({ oldPass: '', newPass: '', rnewPass: '' });
    return (
        <div className={cx('wrapper')}>
            <Divider textAlign="left" className={cx('divider')}>
                THAY ĐỔI MẬT KHẨU
            </Divider>
            <PassInput
                label="Mật khẩu cũ"
                value={info.oldPass}
                placeholder="Enter old password"
                helpText={oldValidated}
            />

            <PassInput
                label="Mật khẩu mới"
                value={info.newPass}
                placeholder="Enter new password"
                helpText={newValidated}
            />
            <PassInput
                label="Nhập lại mật khẩu mới"
                value={info.rnewPass}
                placeholder="Enter new password again"
                helpText={rnewValidated}
            />
            <Button disabled variant="contained" startIcon={<SaveOutlined />} className={cx('bottom-button')}>
                CHANGE
            </Button>
        </div>
    );
}

export default PassChange;
