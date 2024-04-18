import { DefaultLayout } from '~/layouts';
import classNames from 'classnames/bind';

import style from './signup.module.scss';
import RegisterForm from '~/components/RegisterForm';

const cx = classNames.bind(style);

function SignUp() {
    return (
        <DefaultLayout>
            <RegisterForm />
        </DefaultLayout>
    );
}

export default SignUp;
