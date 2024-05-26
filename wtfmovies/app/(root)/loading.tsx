// import DefaultLayout from '~/layouts/DefaultLayout';
import classNames from 'classnames/bind';
import { Skeleton } from '@mui/material';
import images from '~/assets/image';

import styles from './loading.module.scss';
import Title from '~/components/FilmClassify/Title';

const cx = classNames.bind(styles);

export const runtime = 'edge';

export default function Loading() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('home-top')}>
                <Skeleton variant="rounded" animation="wave" className={cx('carosel')} />
                <Skeleton variant="rounded" animation="wave" className={cx('propose-list')} />
            </div>
            <div className={cx('film-classify')}>
                <Skeleton variant="text" sx={{ fontSize: '4.8rem' }} animation="wave" className={cx('title')} />
                <Skeleton variant="rounded" animation="wave" className={cx('tab-box')} />
            </div>
            <div className={cx('film-classify')}>
                <Skeleton variant="text" animation="wave" sx={{ fontSize: '4.8rem' }} className={cx('title')} />
                <Skeleton variant="rounded" animation="wave" className={cx('tab-box')} />
            </div>
        </div>
    );
}
