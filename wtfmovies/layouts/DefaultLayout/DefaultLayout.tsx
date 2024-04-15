import React from 'react';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './DefaultLayout.module.scss';
import { ExtendedUser } from '~/libs/interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { User } from 'next-auth';
// import BottomBar from '../components/BottomBar';

const cx = classNames.bind(styles);

async function DefaultLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    const user: User | undefined = session?.user;
    const extendedUser: ExtendedUser | undefined = user
        ? {
              ...user,
              email: user.email as string | undefined,
          }
        : undefined;

    return (
        <div className={cx('wrapper')}>
            <Header currentUser={extendedUser} />
            <section className={cx('main')}>{children}</section>
            {/* <BottomBar /> */}
            <Footer />
        </div>
    );
}

export default DefaultLayout;
