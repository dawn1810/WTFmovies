'use client';
import classNames from 'classnames/bind';

import style from './ProfileForm.module.scss';
import AvatarUpload from './AvatarUpload';
import UserInfo from './UserInfo';
import UserHobby from './UserHobby';
import { UserInfoInterface } from '~/libs/interfaces';

const cx = classNames.bind(style);

function Profile({ email, userInfo }: { email: string; userInfo: UserInfoInterface }) {
    return (
        <div className={cx('wrapper')}>
            <AvatarUpload avatarImage={userInfo.avatar} />
            <div className={cx('info-container')}>
                <UserInfo
                    userInfoList={{
                        email: email,
                        name: userInfo.name,
                        birthDate: userInfo.birthDate,
                        gender: 1,
                    }}
                />
                <UserHobby
                    userHobby={{
                        actor: userInfo.actor,
                        director: userInfo.director,
                        genres: userInfo.genres,
                        laguages: userInfo.languages,
                    }}
                />
            </div>
        </div>
    );
}

export default Profile;
