'use client';
import classNames from 'classnames/bind';
import Link from 'next/link';

import styles from './Button.module.scss';
import React from 'react';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    leftIcon,
    rightIcon,
    children,
    className,
    onClick,
    ...passProps
}: {
    to?: string;
    href?: string;
    primary?: boolean;
    outline?: boolean;
    text?: boolean;
    rounded?: boolean;
    disabled?: boolean;
    small?: boolean;
    large?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
    className?: any;
    onClick?: () => void;
}) {
    let Comp: any = 'button';
    const props: any = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.href = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        text,
        rounded,
        disabled,
        small,
        large,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
