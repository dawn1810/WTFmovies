import classNames from 'classnames/bind';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import style from './Avatar.module.scss';
import ImageCustom from '~/components/ImageCustom';

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
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            className={cx('upload-btn')}
        >
            Tải ảnh lên
            <VisuallyHiddenInput type="file" onChange={onChange} />
        </Button>
    );
}

function AvatarUpload({
    handleChange,
    avatarImage,
}: {
    handleChange: (event: any) => Promise<void>;
    avatarImage?: string;
}) {
    useEffect(() => {
        return () => {
            avatarImage && URL.revokeObjectURL(avatarImage);
        };
    }, [avatarImage]);

    return (
        <div className={cx('wrapper')}>
            <ImageCustom src={avatarImage} alt="avatar" className={cx('avatar')} />
            <InputFileUpload onChange={handleChange} />
        </div>
    );
}

export default AvatarUpload;
