export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { MongoDate, mongodb, toError, toJSON } from '~/libs/func';
import { auth } from '../../auth/[...nextauth]/auth';
import { ExtendedUser } from '~/libs/interfaces';
import { time } from 'console';

type dataType = { type: 'report' | 'feedback'; content: string };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { type, content }: dataType = await request.json();
        const today = new Date();

        const response = await mongodb()
            .db('statistical')
            .collection('report')
            .insertOne({
                from: extendedUser?.email,
                type,
                content,
                time: MongoDate(today),
            });

        if (!!response) return toJSON('Gửi báo cáo thành công');

        return toError('Gửi báo cáo thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình gửi báo cáo', 500);
    }
}
