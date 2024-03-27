'use client';
import classNames from 'classnames/bind';

import style from './Title.module.scss';

const cx = classNames.bind(style);

function Title({ title, icon, className }: { title: string; icon: any; className?: string | [] }) {
    return (
        <div className={cx('film-classify-title')}>
            <div className={cx('title-sign')} />
            <span className={cx('title')}>{title}</span>
            <span className={cx('left-icon')}>{icon}</span>
        </div>
    );
}

export default Title;
