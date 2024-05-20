export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';

type dataType = { id: string; name: string; maxScore: number };

export async function POST(request: NextRequest) {
    try {
        const { id, name, maxScore }: dataType = await request.json();

        const response = await mongodb()
            .db('evaluate')
            .collection('table')
            .updateOne({
                filter: {
                    _id: ObjectId(id),
                },
                update: {
                    $set: { name, maxScore },
                },
            });

        if (response.modifiedCount === 1) {
            return toJSON('Thay đổi tiêu chuẩn thành công');
        }

        return toError('Thay đổi tiêu chuẩn thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình thay đổi tiểu chuẩn', 500);
    }
}
