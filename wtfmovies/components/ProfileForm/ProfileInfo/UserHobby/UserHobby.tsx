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
import { OptionInterface } from '~/libs/interfaces';

const cx = classNames.bind(style);

function UserHobby({
    userHobby,
}: {
    userHobby: { actor?: string; director?: string; genres?: OptionInterface[]; laguages?: OptionInterface[] };
}) {
    const userInfo = [
        {
            icon: <Face2Outlined />,
            tag: 'Diễn viên',
            content: userHobby.actor || 'Không có',
        },
        {
            icon: <Face6Outlined />,
            tag: 'Đạo diễn',
            content: userHobby.director || 'Không có',
        },
        {
            icon: <MoodOutlined />,
            tag: 'Thể loại',
            content: userHobby?.genres?.join(', ') || 'Không có',
        },
        {
            icon: <TranslateOutlined />,
            tag: 'Ngôn ngữ',
            content: userHobby?.laguages?.join(', ') || 'Không có',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <Divider textAlign="left" className={cx('divider')}>
                SỞ THÍCH XEM PHIM
            </Divider>
            {userInfo.map((info, index) => (
                <div className={cx('user-info')} key={index}>
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
