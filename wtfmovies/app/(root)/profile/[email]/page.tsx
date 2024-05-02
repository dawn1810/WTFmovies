import classNames from 'classnames/bind';

import style from './Profile.module.scss';
import ProfileForm from '~/components/ProfileForm';
import { getUserInfo } from '~/libs/getData/profile';

const cx = classNames.bind(style);

async function Profile() {
    //get all user info
    const userInfo = await getUserInfo();

    return <ProfileForm userInfo={userInfo} />;
}

export default Profile;
