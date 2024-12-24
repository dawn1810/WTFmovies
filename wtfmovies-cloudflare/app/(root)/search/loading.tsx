import classNames from 'classnames/bind';
import Skeleton from '@mui/material/Skeleton';

import styles from '~/app/(root)/loading.module.scss';

const cx = classNames.bind(styles);

export const runtime = 'edge';

export default function Loading() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('film-classify')}>
                <Skeleton variant="text" sx={{ fontSize: '4.8rem' }} animation="wave" className={cx('title')} />
                <Skeleton variant="rounded" animation="wave" className={cx('tab-box')} />
            </div>
        </div>
    );
}
