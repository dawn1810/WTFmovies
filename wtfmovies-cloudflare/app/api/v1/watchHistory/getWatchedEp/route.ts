export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { film_id: string };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;

        const { film_id }: dataType = await request.json();

        const watchedEp = await mongodb()
            .db('user')
            .collection('watchHistory')
            .findOne({
                filter: { email: extendedUser?.email },
                projection: {
                    _id: 0,
                    [film_id]: 1,
                },
            });

        return toJSON({ msg: 'Thay đổi trạng thái thành công', data: watchedEp[film_id] || {} });
    } catch (err) {
        return toError('Lỗi trong quá trình thay đổi trạng thái', 500);
    }
}
