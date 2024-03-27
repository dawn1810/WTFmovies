'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Header from './Header';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({
    playerMenu = false,
    children,
    items = [],
    title,
    hideOnClick = false,
    placement,
    delay,
    className,
    onChange = defaultFn,
}: {
    playerMenu?: boolean;
    children: React.ReactElement;
    items: any;
    title?: string;
    hideOnClick?: boolean;
    placement: any;
    delay: any;
    className?: string;
    onChange?: (item: any) => void;
}) {
    const [history, setHistory] = useState([{ data: items }]);
    const current: any = history[history.length - 1];

    const renderItem = () => {
        return current.data.map((item: any, index: number) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, -1));
    };

    const renderResult = (attrs: any) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper', { 'player-menu-popper': playerMenu })}>
                {title && <h3 className={cx('menu-title')}>{title}</h3>}
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body')}>{renderItem()}</div>
            </PopperWrapper>
        </div>
    );

    // Reset to the first page
    const handleReset = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy
            key="18102003"
            interactive
            touch
            hideOnClick={hideOnClick}
            delay={delay}
            offset={[12, 8]}
            placement={placement}
            render={renderResult}
            onHide={handleReset}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
