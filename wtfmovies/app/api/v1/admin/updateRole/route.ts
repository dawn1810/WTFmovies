export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { email: string; role: string };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { email, role }: dataType = await request.json();

        if (extendedUser?.role === 'admin') {
            const response = await mongodb()
                .db('user')
                .collection('auth')
                .updateOne({
                    filter: { email },
                    update: { $set: { role } },
                });

            if (response.modifiedCount === 1) {
                return toJSON('Thay đổi phân quyền người dùng thành công');
            }

            return toError('Thay đổi phân quyền người dùng thất bại', 400);
        } else {
            return toError('Api không trong phạm trù quyền của bạn', 403);
        }
    } catch (err) {
        return toError('Lỗi trong quá trình thay đổi phân quyền người dùng', 500);
    }
}
