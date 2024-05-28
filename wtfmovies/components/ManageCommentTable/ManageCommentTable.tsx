'use client';
import { timePassed } from '~/libs/clientFunc';
import Table from './Table';
import { CommentInterface } from '~/libs/interfaces';

export default function ManageCommentTable({ dataset }: { dataset: CommentInterface[] }) {
    // export default function ManageCommentTable() {
    const mappedDataset = dataset.map((data: CommentInterface) => ({
        ...data,
        id: data._id,
        time: timePassed(data.time),
    }));

    return <Table title_name="Quản lý bình luận" dataset={mappedDataset} />;
}
