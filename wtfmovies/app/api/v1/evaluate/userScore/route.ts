export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { version } from 'os';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { MongoDate, checkScoreData, mongodb, toError, toJSON } from '~/libs/func';
import { EvalTableInterface, ExtendedUser } from '~/libs/interfaces';

type dataType = { email?: string; score: any; version: string };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { email, score, version }: dataType = await request.json();

        if (!email && email != extendedUser?.email) return toError('Api ngoài thẩm quyền của bạn', 403);

        const currTable: EvalTableInterface[] = await mongodb()
            .db('evaluate')
            .collection('table')
            .find({
                sort: { time: -1 },
                limit: 1,
            });

        if (currTable[0].version !== version) return toError('Phiên bản không còn phù hợp', 410);

        if (!checkScoreData(currTable[0].table, score)) return toError('Điểm số nhập liệu không hợp lệ', 422);

        const today = new Date();
        const response = await mongodb()
            .db('user')
            .collection('evaluate')
            .updateOne({
                filter: { _id: extendedUser?.email, adminScore: { $exists: false }, version },
                update: {
                    $set: { userScore: score, _id: extendedUser?.email, time: MongoDate(today), version },
                },
                upsert: true,
            });

        if (response.modifiedCount === 1 || !!response.upsertedId) return toJSON('Chấm điểm thành công');

        return toError('Chấm điểm thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình chấm điểm' + err, 500);
    }
}
