import classNames from 'classnames/bind';

import style from '../UserInfo.module.scss';
import { Button, Divider } from '@mui/material';
import {
    DriveFileRenameOutlineOutlined,
    Face2Outlined,
    Face6Outlined,
    MoodOutlined,
    TranslateOutlined,
} from '@mui/icons-material';

const cx = classNames.bind(style);

const userInfo = [
    {
        icon: <Face2Outlined />,
        tag: 'Diễn viên',
        content: 'Tom Hanks, Leonardo DiCaprio, Tom Cruise',
    },
    {
        icon: <Face6Outlined />,
        tag: 'Đạo diễn',
        content: 'Steven Spielberg, Christopher Nolan, James CameronSteven Spielberg, Christopher Nolan, James Cameron',
    },
    {
        icon: <MoodOutlined />,
        tag: 'Thể loại',
        content: 'Action, Drama, Detective',
    },
    {
        icon: <TranslateOutlined />,
        tag: 'Ngôn ngữ',
        content: 'English, Tiếng Việt, 日本語',
    },
];

function UserHobby() {
    return (
        <div className={cx('wrapper')}>
            <Divider textAlign="left" className={cx('divider')}>
                SỞ THÍCH XEM PHIM
            </Divider>
            {userInfo.map((info, index) => (
                <div className={cx('user-info')}>
                    <div className={cx('user-info-tags')}>
                        {info.icon}
                        <span>{info.tag}</span>
                    </div>
                    <div className={cx('user-info-content')}>{info.content}</div>
                </div>
            ))}

            <Button
                href="/survey"
                variant="contained"
                startIcon={<DriveFileRenameOutlineOutlined />}
                className={cx('bottom-button')}
            >
                DO SURVEY
            </Button>
        </div>
    );
}

export default UserHobby;
