export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';

type dataType = { id: string; name: string };

export async function POST(request: NextRequest) {
    try {
        const { id, name }: dataType = await request.json();

        const response = await mongodb()
            .db('evaluate')
            .collection('table')
            .updateOne({
                filter: {
                    _id: ObjectId(id),
                },
                update: {
                    $pull: { criteria: { name: name } },
                },
            });

        if (response.modifiedCount === 1) {
            return toJSON('Xoá tiêu chí thành công');
        }

        return toError('Xóa tiêu chí thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình xoá tiêu chí', 500);
    }
}
