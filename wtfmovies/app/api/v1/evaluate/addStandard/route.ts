export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, toError, toJSON } from '~/libs/func';

type dataType = { name: string; maxScore: number };

export async function POST(request: NextRequest) {
    try {
        const { name, maxScore }: dataType = await request.json();

        const response = await mongodb().db('evaluate').collection('table').insertOne({
            name,
            maxScore,
        });

        if (!!response.insertedId) {
            return toJSON(response.insertedId);
        }

        return toError('Xóa tiêu chuẩn thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình xoá tiêu chuẩn', 500);
    }
}
