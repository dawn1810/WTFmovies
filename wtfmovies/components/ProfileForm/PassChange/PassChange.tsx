import classNames from 'classnames/bind';

import style from '~/components/ProfileForm/ProfileInfo/UserInfo.module.scss';
import { Button, Divider, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { SaveOutlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useState } from 'react';

const cx = classNames.bind(style);

const PassInput = ({ label, placeholder, value }: { label: string; placeholder: string; value?: string }) => {
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
            <OutlinedInput
                className={cx('user-info-txt-input')}
                id="outlined-adornment-password"
                value={value}
                placeholder={placeholder}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
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
                }
            />
        </div>
    );
};

function PassChange() {
    return (
        <div className={cx('wrapper')}>
            <Divider textAlign="left" className={cx('divider')}>
                THAY ĐỔI MẬT KHẨU
            </Divider>
            <PassInput label="Mật khẩu cũ" value="" placeholder="Enter old password" />

            <PassInput label="Mật khẩu mới" value="" placeholder="Enter new password" />
            <PassInput label="Nhập lại mật khẩu mới" value="" placeholder="Enter new password again" />
            <Button disabled variant="contained" startIcon={<SaveOutlined />} className={cx('bottom-button')}>
                CHANGE
            </Button>
        </div>
    );
}

export default PassChange;
