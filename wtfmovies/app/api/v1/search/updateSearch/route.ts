export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { toJSON, toError } from '~/libs/func';
import { mongodb } from '~/libs/func';

type dataType = {
    searchValue: string;
};

export async function POST(request: NextRequest) {
    try {
        const { searchValue }: dataType = await request.json();

        const response = await mongodb()
            .db('statistical')
            .collection('search')
            .updateOne({
                filter: { content: searchValue },
                update: {
                    $set: {
                        content: searchValue,
                    },
                    $inc: { time: 1 },
                },
                upsert: true,
            });

        if (!!response) return toJSON('Cập nhật thành công', 200);
        return toError('Cập nhật thất bại', 400);
    } catch (err) {
        console.log(err);
        return toError('Lỗi trong quá trình tìm kiếm', 500);
    }
}
