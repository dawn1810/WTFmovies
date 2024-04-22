import classNames from 'classnames/bind';
import { Button, Divider, styled } from '@mui/material';
import { useEffect, useState } from 'react';

import style from './Avatar.module.scss';
import ImageCustom from '~/components/ImageCustom';
import { CloudUpload } from '@mui/icons-material';

const cx = classNames.bind(style);

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function InputFileUpload({ onChange = () => {} }: { onChange: (event: any) => void }) {
    return (
        <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUpload />}>
            Tải ảnh lên
            <VisuallyHiddenInput type="file" onChange={onChange} />
        </Button>
    );
}

function AvatarUpload({ avatarImage }: { avatarImage?: string }) {
    const [avatar, setAvatar] = useState<any>();

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.priview);
        };
    }, [avatar]);

    const handleChange = (event: any) => {
        const file = event.target.files[0];
        file.priview = URL.createObjectURL(file);
        setAvatar(file);
    };

    return (
        <div className={cx('wrapper')}>
            <Divider textAlign="center" className={cx('title')}>
                AVATAR
            </Divider>
            <ImageCustom src={avatar?.priview || avatarImage} alt="avatar" className={cx('avatar')} />
            <InputFileUpload onChange={handleChange} />
        </div>
    );
}

export default AvatarUpload;
