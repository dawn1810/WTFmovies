export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { score: any };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { score }: dataType = await request.json();

        if (extendedUser?.role === 'admin') {
            const response = await mongodb()
                .db('user')
                .collection('evaluate')
                .updateOne({
                    filter: { _id: extendedUser?.email, adminScore: { $exists: false } },
                    update: { $set: { adminScore: score } },
                });

            if (response.modifiedCount === 1 || !!response.upsertedId) return toJSON('Chấm điểm thành công');
        } else {
            return toError('API ngoài thầm quyền của bạn', 403);
        }

        return toError('Chấm điểm thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình chấm điểm', 500);
    }
}
