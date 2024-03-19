'use client';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from './Title.module.scss';

const cx = classNames.bind(style);

function Title({ title, icon }) {
    return (
        <div className={cx('film-classify-title')}>
            <div className={cx('title-sign')} />
            <span className={cx('title')}>{title}</span>
            <span className={cx('left-icon')}>{icon}</span>
        </div>
    );
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};

export default Title;
