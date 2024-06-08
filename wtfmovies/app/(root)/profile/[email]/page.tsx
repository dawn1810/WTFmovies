import { redirect } from 'next/navigation';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import ProfileForm from '~/components/ProfileForm';
import { getUserInfo, getUserLoveFilmsInfo } from '~/libs/getData/profile';
import NotFound from '../../not-found';

async function Profile() {
    const session = await auth();

    if (!session) {
        redirect('/');
    } else {
        //get all user info
        const userInfo = await getUserInfo();

        const loveFilmsInfo = await getUserLoveFilmsInfo();

        if (!!userInfo && !!loveFilmsInfo)
            return <ProfileForm userInfo={userInfo} loveFilmsInfo={loveFilmsInfo} currPage="1" />;
        else return NotFound();
    }
}

export default Profile;
