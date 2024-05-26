export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { MongoDate, mongodb, toError, toJSON } from '~/libs/func';
import { EvalTableInterface, ExtendedUser } from '~/libs/interfaces';

type dataType = { table: EvalTableInterface };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { table }: dataType = await request.json();

        if (extendedUser?.role === 'admin') {
            const today = new Date();
            const response = await mongodb()
                .db('evaluate')
                .collection('table')
                .insertOne({ table, time: MongoDate(today) });
            if (!!response.insertedId) return toJSON('Cập nhật bảng đánh giá thành công');
        } else return toError('API ngoài thẩm quyền của bạn', 404);

        return toError('Cập nhật bảng đánh giá thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình cập nhật bảng đánh giá', 500);
    }
}
