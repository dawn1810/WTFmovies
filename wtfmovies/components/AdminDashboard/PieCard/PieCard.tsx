import classNames from 'classnames/bind';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardActionArea } from '@mui/material';

import style from './PieCard.module.scss';

const cx = classNames.bind(style);

const data = [
    { id: 0, value: 100, label: 'Naruto' },
    { id: 1, value: 75, label: 'Sasuke' },
    { id: 2, value: 70, label: '寂しい 犬' },
    { id: 3, value: 50, label: 'Lon Dai dE' },
    { id: 4, value: 18, label: 'Đẹp gái nhất thế giới' },
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
                            startAngle: 90,
                            endAngle: 360,
                            // cx: '65%',
                            // cy: '45%',
                        },
                    ]}
                    slotProps={{
                        legend: {
                            position: { horizontal: 'right', vertical: 'top' },
                        },
                    }}
                    height={350}
                />
            </CardActionArea>
        </Card>
    );
}
