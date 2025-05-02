'use client';
import { convertGender } from '~/libs/clientFunc';
import Table from './Table';
import { UserAdminInfoInfterface } from '~/libs/interfaces';

export default function FilmPage({ dataset }: { dataset: UserAdminInfoInfterface[] }) {
    const mappedDataset = dataset.map((data: UserAdminInfoInfterface, index: number) => ({
        ...data,
        index: index + 1,
        gender: convertGender(data.gender),
        status: data.status[0],
        role: data.role[0],
    }));

    return <Table title_name="Quản lý người dùng" dataset={mappedDataset} />;
}
