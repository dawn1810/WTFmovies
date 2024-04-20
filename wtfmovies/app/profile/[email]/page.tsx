import classNames from 'classnames/bind';

import style from './Profile.module.scss';
import ProfileForm from '~/components/ProfileForm';

const cx = classNames.bind(style);

function Profile({ params }: { params: { email: string } }) {
    return <ProfileForm />;
}

export default Profile;
