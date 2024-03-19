'use client';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from './TabFlexContent.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(style);

function TabFlexContent({ episodes }) {
    return (
        <div className={cx('wrapper')}>
            {episodes.map((episode, index) => (
                <Button primary key={index} className={cx('expisode')}>
                    {episode}
                </Button>
            ))}
        </div>
    );
}

TabFlexContent.propTypes = {
    episodes: PropTypes.array.isRequired,
};

export default TabFlexContent;
