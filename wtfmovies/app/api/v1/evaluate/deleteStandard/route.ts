export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';

type dataType = { id: string };

export async function POST(request: NextRequest) {
    try {
        const { id }: dataType = await request.json();

        const response = await mongodb()
            .db('evaluate')
            .collection('table')
            .deleteOne({
                filter: {
                    _id: ObjectId(id),
                },
            });

        if (response.deletedCount === 1) {
            return toJSON('Xoá tiêu chuẩn thành công');
        }

        return toError('Xóa tiêu chuẩn thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình xoá tiêu chuẩn', 500);
    }
}
