'use client';
import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const fetchPublicKey = async () => {
            try {
                const response = await fetch('/api/auth/getPublicKey', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const res = await response.json(); // Make sure to await the json() call
                    sessionStorage.setItem('publicKey', String(res));
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error('Error fetching public key:', error);
            }
        };

        if (!sessionStorage.getItem('publicKey')) fetchPublicKey();
        else console.log('aaa');
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
