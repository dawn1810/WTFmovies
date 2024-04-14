'use client';
import classNames from 'classnames/bind';

import style from './TabFlexContent.module.scss';
import Button from '~/components/Button';

import { useRouter, usePathname } from 'next/navigation'


const cx = classNames.bind(style);

function TabFlexContent({ episodes, active_episode, listIdEp }: { episodes: [], active_episode?: number, listIdEp?: any[] }) {
    const router = useRouter();
    const pathname = usePathname();
    function handleEpClick(value: any, index: any) {

        router.push(pathname.replace(/tap.*/g, `tap${value}`), { scroll: true });
    }
    return (
        <div className={cx('wrapper')}>
            {episodes.map((episode, index) => (
                <Button primary disabled={episode === active_episode} key={index} className={cx('expisode', { watching: episode === active_episode })}
                    onClick={() => handleEpClick(episode, index)}
                >
                    {episode}
                </Button>
            ))}
        </div>
    );
}

export default TabFlexContent;
