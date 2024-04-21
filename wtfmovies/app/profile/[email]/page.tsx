import classNames from 'classnames/bind';

import style from './Profile.module.scss';
import ProfileForm from '~/components/ProfileForm';
import { getUserInfo } from '~/libs/getData/profile';

const cx = classNames.bind(style);

async function Profile({ params }: { params: { email: string } }) {
    const { email } = params;
    //get all user info
    const userInfo = await getUserInfo();

    return <ProfileForm email={email} userInfo={userInfo} />;
}

export default Profile;
