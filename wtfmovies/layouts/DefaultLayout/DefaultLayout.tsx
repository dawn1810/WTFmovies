'use client';
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
            <section className={cx('main')}>{children}</section>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
