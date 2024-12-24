'use client';
import { Tabs, Tab } from 'react-bootstrap';
import classNames from 'classnames/bind';

import TabGridContent from './TabGridContent';
import style from './TabsBox.module.scss';
import TabFlexContent from './TabFlexContent';
import FilmProposeList from '../FilmProposeList';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotify } from '../Notify/notifySlide';

const cx = classNames.bind(style);

type tab = {
    eventKey: string;
    title: string;
    content: any;
};

function TabBox({
    to,
    commentContent = false,
    listContent = false,
    flexContent = false,
    textContent = false,
    gridContent = false,
    listIdEp,
    tabs,
    setCurrTab,
    currTab,
    active_episode,
    defaultActiveKey,
    className,
    film_id,
}: {
    to?: string;
    setCurrTab?: any;
    currTab?: any;
    commentContent?: boolean;
    listContent?: boolean;
    flexContent?: boolean;
    textContent?: boolean;
    gridContent?: boolean;
    listIdEp?: any[];
    tabs: tab[];
    active_episode?: number;
    defaultActiveKey?: string;
    className?: string | [];
    film_id?: string;
}) {
    const [watchedEp, setWatchedEp] = useState({});

    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: true }));
    };

    // update episode watched
    useEffect(() => {
        if (!film_id) return;
        const localStore = localStorage.getItem(film_id);
        if (!localStore) {
            const newData: any = {
                curr: active_episode,
            };
            if (active_episode) {
                newData[active_episode] = 0;
            }
            setWatchedEp(newData);
            localStorage.setItem(film_id, JSON.stringify(newData));
        } else {
            const newData = JSON.parse(localStore || '{}');
        
            if (active_episode && !newData[active_episode]) {
                newData[active_episode] = 0;
            }
            newData.curr = active_episode; // update curr watching episode
            setWatchedEp(newData);
            localStorage.setItem(film_id, JSON.stringify(newData));
        }
    }, []);

    return (
        <div className={cx('wrapper', className)}>
            <Tabs
                transition={false}
                className={cx('tabs', 'flex-nowrap', { 'cmt-tabs': commentContent })}
                defaultActiveKey={defaultActiveKey}
                onSelect={(e: any) => {
                    if (setCurrTab) setCurrTab(e);
                }}
            >
                {tabs.map((tab, index) => (
                    <Tab
                        className={cx('tab-content', {
                            'grid-content': gridContent,
                            'text-content': textContent,
                            'list-content': listContent,
                            'cmt-content': commentContent,
                        })}
                        key={index}
                        eventKey={tab.eventKey}
                        title={tab.title}
                    >
                        {gridContent ? (
                            <TabGridContent currTab={currTab} to={to} films={tab.content} />
                        ) : flexContent ? (
                            <TabFlexContent
                                episodes={tab.content}
                                active_episode={active_episode}
                                listIdEp={listIdEp}
                                watchedEp={watchedEp}
                            />
                        ) : listContent ? (
                            <FilmProposeList films={tab.content} className={cx('films-list')} />
                        ) : (
                            tab.content
                        )}
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
}

export default TabBox;
