export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { notifyId: string };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { notifyId }: dataType = await request.json();

        const response = await mongodb()
            .db('user')
            .collection('information')
            .updateOne({
                filter: { email: extendedUser?.email },
                update: { $pull: { notifications: ObjectId(notifyId) } },
            });

        if (response.modifiedCount === 1) return toJSON('Gỡ thông báo thành công');

        return toError('Gỡ thông báo thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình gỡ thông báo', 500);
    }
}
