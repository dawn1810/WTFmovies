import React from 'react';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('main')}>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
