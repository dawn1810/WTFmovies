import React from 'react';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './DefaultLayout.module.scss';
import { getCurrentUser } from '~/libs/getData/home';
import BottomBar from '../components/BottomBar';

const cx = classNames.bind(styles);

async function DefaultLayout({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser();

    return (
        <div className={cx('wrapper')}>
            <Header currentUser={currentUser} />
            <section className={cx('main')}>{children}</section>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
