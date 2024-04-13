'use client';
import classNames from 'classnames/bind';

import style from './TabFlexContent.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(style);

function TabFlexContent({ episodes, active_index, handleEpClick }: { episodes: [], active_index?: number, handleEpClick: any }) {
    console.log(active_index);

    return (
        <div className={cx('wrapper')}>
            {episodes.map((episode, index) => (
                <Button primary disabled={episode === active_index} key={index} className={cx('expisode', { watching: episode === active_index })}
                    onClick={handleEpClick}
                >
                    {episode}
                </Button>
            ))}
        </div>
    );
}

export default TabFlexContent;
