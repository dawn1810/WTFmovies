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
    horizontal = false,
    height,
}: {
    area?: string;
    dataset: any[];
    series: any[];
    ykey: string;
    title: string;
    horizontal?: boolean;
    height: number;
}) {
    const chartSetting: any = horizontal
        ? {
              yAxis: [
                  {
                      scaleType: 'band',
                      dataKey: ykey,
                      valueFormatter: (value: any, context: any) =>
                          context.location === 'tick' ? value.substring(0, 3) : value,
                  },
              ],
              layout: 'horizontal',
          }
        : {
              xAxis: [
                  {
                      scaleType: 'band',
                      dataKey: ykey,
                      valueFormatter: (value: any, context: any) =>
                          context.location === 'tick' ? value.substring(0, 3) : value,
                  },
              ],
          };

    return (
        <Card style={{ gridArea: area }}>
            <CardActionArea
                className={cx('card-area')}
                onClick={() => {
                    console.log('aaaa');
                }}
            >
                <h4 className={cx('card-title')}>{title}</h4>

                <BarChart dataset={dataset} series={series} className={cx('chart')} height={height} {...chartSetting} />
            </CardActionArea>
        </Card>
    );
}
