import classNames from 'classnames/bind';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardActionArea } from '@mui/material';

import style from './PieCard.module.scss';

const cx = classNames.bind(style);

const data = [
    { id: 0, value: 10, label: 'series A' },
    { id: 1, value: 15, label: 'series B' },
    { id: 2, value: 20, label: 'series C' },
];

export default function PieCard({ area }: { area: string }) {
    return (
        <Card style={{ gridArea: area }}>
            <CardActionArea
                className={cx('card-area')}
                onClick={() => {
                    console.log('aaaa');
                }}
            >
                <h4 className={cx('card-title')}>Từ khoá thịnh hành</h4>
                <PieChart
                    series={[
                        {
                            data,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            cx: '65%',
                            cy: '45%',
                        },
                    ]}
                    slotProps={{
                        legend: { position: { horizontal: 'middle', vertical: 'bottom' }, direction: 'row' },
                    }}
                    height={400}
                />
            </CardActionArea>
        </Card>
    );
}
