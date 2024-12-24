import classNames from 'classnames/bind';

import style from './ProfileInfo.module.scss';
import UserInfo from './UserInfo';
import UserHobby from './UserHobby';
import { UserInfoInterface } from '~/libs/interfaces';

const cx = classNames.bind(style);

function ProfileInfo({ userInfo }: { userInfo: UserInfoInterface }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info-container')}>
                <UserInfo
                    avatar={userInfo.avatar}
                    userInfoList={{
                        email: userInfo.email,
                        name: userInfo.name,
                        birthDate: userInfo.birthDate,
                        gender: 0,
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

export default ProfileInfo;
