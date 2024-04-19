'use client';
import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

export default Wrapper;
