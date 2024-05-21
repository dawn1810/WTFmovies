export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';

type dataType = { _id: string; name: string; maxScore: number };

export async function POST(request: NextRequest) {
    try {
        const { _id, name, maxScore }: dataType = await request.json();

        const response = await mongodb()
            .db('evaluate')
            .collection('table')
            .updateOne({
                filter: {
                    _id: ObjectId(_id),
                },
                update: { $push: { criteria: { name, maxScore } } },
                upsert: true,
            });

        if (response.modifiedCount === 1) {
            return toJSON('Thêm tiêu chí thành công');
        }

        return toError('Xóa tiêu chí thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình xoá tiêu chí', 500);
    }
}
