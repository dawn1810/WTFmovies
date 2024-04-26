import classNames from 'classnames/bind';

import style from './NumCard.module.scss';
import { Card, CardActionArea } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const cx = classNames.bind(style);

export default function AdminDashboard({
    title,
    number,
    change,
    up = false,
}: {
    title: string;
    number: number;
    change: number;
    up?: boolean;
}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea
                className={cx('card')}
                style={{
                    borderBottom: up ? '3px solid var(--green-highlight-color);' : '3px solid var(--highlight-color);',
                }}
                onClick={() => {
                    console.log('aaaa');
                }}
            >
                <h4 className={cx('card-title')}>{title}</h4>
                <div className={cx('card-content')}>
                    <div className={cx('number')}>{number}</div>
                    <div
                        className={cx('change')}
                        style={{ color: up ? 'var(--green-highlight-color)' : 'var(--highlight-color)' }}
                    >
                        {up ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        {change}%
                    </div>
                </div>
            </CardActionArea>
        </Card>
    );
}
