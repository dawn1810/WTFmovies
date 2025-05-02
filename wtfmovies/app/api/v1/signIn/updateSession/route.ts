export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;
        // if (extendedUser?.role === 'admin') {
        //     const response = await mongodb()
        //         .db('user')
        //         .collection('auth')
        //         .deleteMany({
        //             filter: { _id: { $in: ids } },
        //         });

        //     if (response) {
        //         return toJSON('Thay đổi trạng thái thành công');
        //     }

        //     return toError('Thay đổi trạng thái thất bại', 400);
        // } else {
        //     return toError('Api không trong phạm trù quyền của bạn', 403);
        // }
    } catch (err) {
        return toError('Lỗi trong quá trình thay đổi trạng thái', 500);
    }
}
