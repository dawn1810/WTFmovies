'use client';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import classNames from 'classnames/bind';
import ImageCustom from '~/components/ImageCustom';
import { Button, Divider, MenuItem, Select, TextField, styled } from '@mui/material';
import {
    CloudUpload,
    PermIdentityOutlined,
    AlternateEmailOutlined,
    TransgenderOutlined,
    CelebrationOutlined,
    SaveOutlined,
    DriveFileRenameOutlineOutlined,
    Face2Outlined,
    Face6Outlined,
    TranslateOutlined,
    MoodOutlined,
} from '@mui/icons-material';

import style from './Profile.module.scss';

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

function InputFileUpload() {
    return (
        <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUpload />}>
            Tải ảnh lên
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}

function Profile({ params }: { params: { email: string } }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar-container')}>
                <ImageCustom
                    src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/475024Fdv/avatar-xinh-de-thuong_033515558.jpg"
                    alt="avatar"
                    className={cx('avatar')}
                />
                <InputFileUpload />
            </div>
            <div className={cx('info-container')}>
                <div className={cx('container')}>
                    <Divider textAlign="left" className={cx('divider')}>
                        THÔNG TIN CÁ NHÂN
                    </Divider>
                    <div className={cx('user-info')}>
                        <div className={cx('user-info-tags')}>
                            <AlternateEmailOutlined />
                            <span>Email:</span>
                        </div>
                        <TextField
                            disabled
                            className={cx('user-info-txt-input')}
                            id="standard-basic"
                            // label="Standard"
                            value="binhminh19112003@gmail.com"
                            variant="outlined"
                        />
                    </div>
                    <div className={cx('user-info')}>
                        <div className={cx('user-info-tags')}>
                            <PermIdentityOutlined />
                            <span>Họ và tên:</span>
                        </div>
                        <TextField
                            className={cx('user-info-txt-input')}
                            id="standard-basic"
                            value="Nguyễn Bình Minh"
                            variant="outlined"
                        />
                    </div>
                    <div className={cx('user-info')}>
                        <div className={cx('user-info-tags')}>
                            <TransgenderOutlined />
                            <span>Giới tính:</span>
                        </div>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={1}
                            className={cx('user-info-txt-input')}
                            // label="Age"
                            // onChange={handleChange}
                        >
                            <MenuItem value={0}>Nam</MenuItem>
                            <MenuItem value={1}>Nữ</MenuItem>
                            <MenuItem value={2}>Khác</MenuItem>
                        </Select>
                    </div>
                    <div className={cx('user-info')}>
                        <div className={cx('user-info-tags')}>
                            <CelebrationOutlined />
                            <span>Sinh nhật:</span>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                // label="Controlled picker"
                                value={dayjs('2022-04-17')}
                                className={cx('user-info-txt-input')}
                                // onChange={(newValue) => setValue(newValue)}
                            />
                        </LocalizationProvider>
                    </div>
                    <Button disabled variant="contained" startIcon={<SaveOutlined />} className={cx('bottom-button')}>
                        SAVE
                    </Button>
                </div>
                <div className={cx('container')}>
                    <Divider textAlign="left" className={cx('divider')}>
                        SỞ THÍCH XEM PHIM
                    </Divider>
                    <div className={cx('user-info')}>
                        <div className={cx('user-info-tags')}>
                            <Face2Outlined />
                            <span>Diễn viên:</span>
                        </div>
                        <div className={cx('user-info-content')}>Tom Hanks, Leonardo DiCaprio, Tom Cruise</div>
                    </div>
                    <div className={cx('user-info')}>
                        <div className={cx('user-info-tags')}>
                            <Face6Outlined />
                            <span>Đạo diễn:</span>
                        </div>
                        <div className={cx('user-info-content')}>
                            Steven Spielberg, Christopher Nolan, James CameronSteven Spielberg, Christopher Nolan, James
                            Cameron
                        </div>
                    </div>
                    <div className={cx('user-info')}>
                        <div className={cx('user-info-tags')}>
                            <MoodOutlined />
                            <span>Thể loại:</span>
                        </div>
                        <div className={cx('user-info-content')}>Action, Drama, Detective</div>
                    </div>
                    <div className={cx('user-info')}>
                        <div className={cx('user-info-tags')}>
                            <TranslateOutlined />
                            <span>Ngôn ngữ:</span>
                        </div>
                        <div className={cx('user-info-content')}>English, Tiếng Việt, 日本語</div>
                    </div>
                    <Button
                        variant="contained"
                        startIcon={<DriveFileRenameOutlineOutlined />}
                        className={cx('bottom-button')}
                    >
                        DO SURVEY
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
