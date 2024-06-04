import classNames from 'classnames/bind';

import style from '../UserInfo.module.scss';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import Face2OutlinedIcon from '@mui/icons-material/Face2Outlined';
import Face6OutlinedIcon from '@mui/icons-material/Face6Outlined';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';

import { OptionInterface } from '~/libs/interfaces';

const cx = classNames.bind(style);

function UserHobby({
    userHobby,
}: {
    userHobby: { actor?: string; director?: string; genres?: OptionInterface[]; laguages?: OptionInterface[] };
}) {
    const userInfo = [
        {
            icon: <Face2OutlinedIcon />,
            tag: 'Diễn viên',
            content: userHobby.actor || 'Không có',
        },
        {
            icon: <Face6OutlinedIcon />,
            tag: 'Đạo diễn',
            content: userHobby.director || 'Không có',
        },
        {
            icon: <MoodOutlinedIcon />,
            tag: 'Thể loại',
            content: userHobby?.genres?.join(', ') || 'Không có',
        },
        {
            icon: <TranslateOutlinedIcon />,
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
                startIcon={<DriveFileRenameOutlineOutlinedIcon />}
                className={cx('bottom-button')}
            >
                DO SURVEY
            </Button>
        </div>
    );
}

export default UserHobby;
