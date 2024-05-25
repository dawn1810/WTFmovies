import ProfileForm from '~/components/ProfileForm';
import { getUserInfo, getUserLoveFilmsInfo } from '~/libs/getData/profile';

async function Profile() {
    //get all user info
    const userInfo = await getUserInfo();

    const loveFilmsInfo = await getUserLoveFilmsInfo();

    return <ProfileForm userInfo={userInfo} loveFilmsInfo={loveFilmsInfo} />;
}

export default Profile;
