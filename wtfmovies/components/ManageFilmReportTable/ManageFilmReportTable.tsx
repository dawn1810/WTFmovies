'use client';
import { timePassed } from '~/libs/clientFunc';
import Table from './Table';
import { CommentInterface } from '~/libs/interfaces';

export default function ManageFilmReportTable({ dataset }: { dataset: any[] }) {
    // export default function ManageCommentTable() {
    const mappedDataset = dataset.map((data: any) => ({
        ...data,
        id: data.film_id,
        time: timePassed(data.time),
    }));
    // console.log(mappedDataset);
    

    return <Table title_name="Báo cáo phim" dataset={mappedDataset} />;
}
