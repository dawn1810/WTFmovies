'use client';
import classNames from 'classnames/bind';

import style from './TabFlexContent.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(style);

function TabFlexContent({ episodes, active_index }: { episodes: [], active_index?: number }) {
    console.log(active_index);

    return (
        <div className={cx('wrapper')}>
            {episodes.map((episode, index) => (
                <Button primary disabled={episode === active_index} key={index} className={cx('expisode', { active: episode === active_index })}
                >
                    {episode}
                </Button>
            ))}
        </div>
    );
}

export default TabFlexContent;
