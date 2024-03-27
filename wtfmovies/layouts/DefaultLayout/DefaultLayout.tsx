'use client';
import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const updateCookies = async () => {
            try {
                const res = await fetch('/api/auth/updateUserCookies', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (res.status === 204) {
                }
            } catch (error) {
                console.error('Error fetching public key:', error);
            }
        };

        updateCookies(); // Catch and display any boo-boos.
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <section className={cx('main')}>{children}</section>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
