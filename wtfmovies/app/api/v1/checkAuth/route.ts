export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;

        const currUser = await mongodb()
            .db('user')
            .collection('auth')
            .findOne({
                filter: { email: extendedUser?.email },
                projection: {
                    _id: 0,
                    status: 1,
                    unBanDates: 1,
                },
            });

        if (currUser.status) return toJSON('Thay đổi trạng thái thành công');
        else {
            const today = new Date();
            const unBanDate = new Date(currUser.unBanDates);

            if (today > unBanDate) {
                const updateStatus = await mongodb()
                    .db('user')
                    .collection('auth')
                    .updateOne({
                        filter: { email: extendedUser?.email },
                        update: {
                            $set: { status: true },
                        },
                    });
                return toJSON('Thay đổi trạng thái thành công');
            } else return toError('Tài khoản đang bị cấm', 400);
        }
    } catch (err) {
        return toError('Lỗi trong quá trình thay đổi trạng thái', 500);
    }
}
