import classNames from 'classnames/bind';
import { BarChart } from '@mui/x-charts/BarChart';

import style from './BarCard.module.scss';
import { Card, CardActionArea } from '@mui/material';

const cx = classNames.bind(style);

// const valueFormatter = (value: number | null) => `${value}mm`;

export default function BarCard({
    area,
    dataset,
    series,
    ykey,
    title,
}: {
    area?: string;
    dataset: any[];
    series: any[];
    ykey: string;
    title: string;
}) {
    return (
        <Card style={{ gridArea: area }}>
            <CardActionArea
                className={cx('card-area')}
                onClick={() => {
                    console.log('aaaa');
                }}
            >
                <h4 className={cx('card-title')}>{title}</h4>

                <BarChart
                    dataset={dataset}
                    yAxis={[{ scaleType: 'band', dataKey: ykey }]}
                    series={series}
                    layout="horizontal"
                    className={cx('chart')}
                    // xAxis={[
                    //     {
                    //         label: title,
                    //     },
                    // ]}
                    height={400}
                />
            </CardActionArea>
        </Card>
    );
}
