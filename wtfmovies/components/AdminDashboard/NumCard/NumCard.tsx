import classNames from 'classnames/bind';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Card, CardActionArea } from '@mui/material';

import style from './NumCard.module.scss';

const cx = classNames.bind(style);

export default function NumCard({
    title,
    number,
    change,
    area,
    up = false,
}: {
    title: string;
    number: number;
    change: number;
    area?: string;
    up?: boolean;
}) {
    return (
        <Card style={{ gridArea: area }}>
            <CardActionArea
                className={cx('card-area', { 'card-green': up })}
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
