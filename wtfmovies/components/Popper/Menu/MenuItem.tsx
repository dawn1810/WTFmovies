'use client';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Menu.module.scss';
import { HeaderMenuItemsInterface } from '~/libs/interfaces';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }: { data: HeaderMenuItemsInterface; onClick: (e: any) => void }) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    return (
        <Button primary className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}



export default MenuItem;
