export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { MongoDate, mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { score: any };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { score }: dataType = await request.json();

        const today = new Date();
        const response = await mongodb()
            .db('evaluate')
            .collection('table')
            .updateOne({
                filter: {},
                update: { userScore: score, email: extendedUser?.email, time: MongoDate(today) },
                upsert: true,
            });

        if (response.modifiedCount === 1) return toJSON('Cập nhật bảng đánh giá thành công');

        return toError('Cập nhật bảng đánh giá thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình cập nhật bảng đánh giá', 500);
    }
}
