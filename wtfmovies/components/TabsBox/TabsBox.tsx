'use client';
import { Tabs, Tab } from 'react-bootstrap';
import classNames from 'classnames/bind';

import TabGridContent from './TabGridContent';
import style from './TabsBox.module.scss';
import TabFlexContent from './TabFlexContent';
import FilmProposeList from '../FilmProposeList';
import { useState } from 'react';

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
}) {

    return (
        <div className={cx('wrapper', className)}>
            <Tabs
                transition={false}
                className={cx('tabs', 'flex-nowrap', { 'cmt-tabs': commentContent })}
                defaultActiveKey={defaultActiveKey}
                onSelect={(e: any) => setCurrTab(e)}
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
                            />
                        ) : listContent ? (
                            <FilmProposeList films={tab.content} className={cx('films-list')} />
                        ) : (
                            tab.content
                        )}
                    </Tab>
                ))}
            </Tabs>
        </div >
    );
}

export default TabBox;
