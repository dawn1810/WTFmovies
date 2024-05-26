import classNames from 'classnames/bind';

import style from './PassInput.module.scss';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useState } from 'react';

const cx = classNames.bind(style);

const PassInput = ({
    label,
    placeholder,
    value,
    helpText,
    inputName,
    onChange,
}: {
    label: string;
    placeholder: string;
    value?: string;
    helpText?: string;
    inputName?: string;
    onChange?: (event: any) => void;
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
                error={!!helpText}
                name={inputName}
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
                onChange={onChange}
            />
        </div>
    );
};

export default PassInput;