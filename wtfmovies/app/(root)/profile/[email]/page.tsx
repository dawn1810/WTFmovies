import classNames from 'classnames/bind';

import style from './Profile.module.scss';
import ProfileForm from '~/components/ProfileForm';
import { getUserInfo, getUserLoveFilmsInfo } from '~/libs/getData/profile';

const cx = classNames.bind(style);

async function Profile() {
    //get all user info
    const userInfo = await getUserInfo();

    const loveFilmsInfo = await getUserLoveFilmsInfo();
    console.log(loveFilmsInfo);

    return <ProfileForm userInfo={userInfo} loveFilmsInfo={loveFilmsInfo} />;
}

export default Profile;
