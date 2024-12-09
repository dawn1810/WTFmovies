'use client';
import Table from './Table';
import { AdminCaroselInfterface } from '~/libs/interfaces';

export default function ManageCaroselTable({ dataset }: { dataset: AdminCaroselInfterface[] }) {
    const mappedDataset = dataset.map((data: AdminCaroselInfterface) => ({
        ...data,
        id: data._id,
        poster: data.specialPoster || data.poster
    }));

    return <Table title_name="Danh sách ưu tiên" dataset={mappedDataset} />;
}
