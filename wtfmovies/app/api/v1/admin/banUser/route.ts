export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { emails: string[]; ban: boolean };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { emails, ban }: dataType = await request.json();

        if (extendedUser?.role === 'admin') {
            const response = await mongodb()
                .db('user')
                .collection('auth')
                .updateOne({
                    filter: { email: { $in: emails } },
                    update: { $set: { status: ban } },
                });

            if (response.modifiedCount === 1) {
                return toJSON('Thay đổi trạng thái thành công');
            }

            return toError('Thay đổi trạng thái thất bại', 400);
        } else {
            return toError('Api không trong phạm trù quyền của bạn', 403);
        }
    } catch (err) {
        return toError('Lỗi trong quá trình thay đổi trạng thái', 500);
    }
}
