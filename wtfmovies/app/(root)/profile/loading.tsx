import classNames from 'classnames/bind';
import { Skeleton } from '@mui/material';

import styles from '~/app/(root)/loading.module.scss';

const cx = classNames.bind(styles);

export const runtime = 'edge';

export default function Loading() {
    return (
        <div className={cx('wrapper')}>
            <Skeleton variant="rounded" animation="wave" className={cx('profile')} />
        </div>
    );
}
