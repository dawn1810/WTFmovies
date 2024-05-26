'use client';
import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import classNames from 'classnames/bind';
import { UserInfoInterface } from '~/libs/interfaces';
import style from './ProfileForm.module.scss';
import ProfileInfo from './ProfileInfo';
import PassChange from './PassChange';
import LoveFilms from './LoveFilms';

const cx = classNames.bind(style);

function Profile({ userInfo, loveFilmsInfo }: { userInfo: UserInfoInterface; loveFilmsInfo: any }) {
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className={cx('wrapper')}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Thông tin cá nhân" value="1" />
                        <Tab label="Thay đổi mật khẩu" value="2" />
                        <Tab label="Danh sách film yêu thích" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <ProfileInfo userInfo={userInfo} />
                </TabPanel>
                <TabPanel value="2">
                    <PassChange />
                </TabPanel>
                <TabPanel value="3">
                    <LoveFilms loveFilmsInfo={loveFilmsInfo} />
                </TabPanel>
            </TabContext>
        </div>
    );
}

export default Profile;
