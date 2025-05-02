import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { redirect } from 'next/navigation';
import RegisterForm from '~/components/RegisterForm';

async function SignUp() {
    const session = await auth();

    if (!!session) {
        redirect('/');
    } else {
        return <RegisterForm />;
    }
}

export default SignUp;
