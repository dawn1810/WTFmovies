'use client';
import classNames from 'classnames/bind';

import style from './TabFlexContent.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(style);

function TabFlexContent({ episodes }: { episodes: [] }) {
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

export default TabFlexContent;
