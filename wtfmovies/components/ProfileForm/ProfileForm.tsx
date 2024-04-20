'use client';
import classNames from 'classnames/bind';

import style from './ProfileForm.module.scss';
import AvatarUpload from './AvatarUpload';
import UserInfo from './UserInfo';
import UserHobby from './UserHobby';

const cx = classNames.bind(style);

function Profile() {
    return (
        <div className={cx('wrapper')}>
            <AvatarUpload />
            <div className={cx('info-container')}>
                <UserInfo />
                <UserHobby />
            </div>
        </div>
    );
}

export default Profile;
