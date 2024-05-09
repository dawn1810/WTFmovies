'use client';
import { timePassed } from '~/libs/clientFunc';
import Table from './Table';
import { AdminReportInfterface } from '~/libs/interfaces';

export default function FilmPage({ dataset }: { dataset: AdminReportInfterface[] }) {
    const mappedDataset = dataset.map((data: AdminReportInfterface, index: number) => ({
        ...data,
        id: data._id,
        time: timePassed(data.time),
    }));

    return <Table title_name="Quản lý báo cáo" dataset={mappedDataset} />;
}
