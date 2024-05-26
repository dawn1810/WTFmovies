export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { MongoDate, mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { email?: string; score: any };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { email, score }: dataType = await request.json();

        if (!email && email != extendedUser?.email) return toError('Api ngoài thẩm quyền của bạn', 403);

        const today = new Date();
        const response = await mongodb()
            .db('user')
            .collection('evaluate')
            .updateOne({
                filter: { _id: extendedUser?.email, adminScore: { $exists: false } },
                update: { $set: { userScore: score, _id: extendedUser?.email, time: MongoDate(today) } },
                upsert: true,
            });

        if (response.modifiedCount === 1 || !!response.upsertedId) return toJSON('Chấm điểm thành công');

        return toError('Chấm điểm thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình chấm điểm', 500);
    }
}
