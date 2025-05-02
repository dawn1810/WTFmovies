export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { MongoDate, mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { emails: string[]; ban: boolean; unbanDate: string; banTime: string };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { emails, ban, unbanDate, banTime }: dataType = await request.json();

        if (extendedUser?.role !== 'admin') return toError('Api không trong phạm trù quyền của bạn', 403);

        const today = new Date();
        const date = new Date(unbanDate);
        const response = await mongodb()
            .db('user')
            .collection('auth')
            .updateMany({
                filter: { email: { $in: emails } },
                update: { $set: { status: ban, unBanDates: MongoDate(date) } },
            });

        // update user history
        const history = await mongodb()
            .db('user')
            .collection('information')
            .updateMany({
                filter: { email: { $in: emails } },
                update: {
                    $push: {
                        history: {
                            doer: extendedUser.email,
                            action: !ban
                                ? today < date
                                    ? 'Bị cấm ' + banTime + ' ngày từ ' + today.toISOString().substring(0, 10)
                                    : 'Bị cấm vĩnh viễn'
                                : 'Gỡ cấm',
                            time: MongoDate(today),
                        },
                    },
                },
            });

        if (response.modifiedCount >= 1 && history.modifiedCount === response.modifiedCount) {
            return toJSON('Thay đổi trạng thái thành công');
        }

        return toError('Thay đổi trạng thái thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình thay đổi trạng thái', 500);
    }
}
