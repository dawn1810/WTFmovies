// import DefaultLayout from '~/layouts/DefaultLayout';
import classNames from 'classnames/bind';
import Skeleton from '@mui/material/Skeleton';

import styles from '~/app/(root)/loading.module.scss';

const cx = classNames.bind(styles);

export const runtime = 'edge';

export default function Loading() {
    return (
        <div className={cx('wrapper')}>
            <Skeleton variant="text" animation="wave" className={cx('film-name')} />
            <div className={cx('film-notify')}>
                <Skeleton variant="text" animation="wave" className={cx('title')} />
                <Skeleton variant="rounded" animation="wave" className={cx('tab-box')} />
            </div>
            <Skeleton variant="rounded" animation="wave" className={cx('player')} />
            <div className={cx('film-notify')}>
                <Skeleton variant="text" animation="wave" className={cx('title')} />
                <Skeleton variant="rounded" animation="wave" className={cx('tab-box')} />
            </div>
            <div className={cx('home-top')}>
                <Skeleton variant="text" animation="wave" className={cx('title')} />
                <Skeleton variant="rounded" animation="wave" className={cx('propose-list')} />
            </div>
            <div className={cx('film-classify')}>
                <Skeleton variant="text" sx={{ fontSize: '4.8rem' }} animation="wave" className={cx('title')} />
                <Skeleton variant="rounded" animation="wave" className={cx('tab-box')} />
            </div>
        </div>
    );
}
