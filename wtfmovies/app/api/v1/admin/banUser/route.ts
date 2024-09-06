export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { MongoDate, mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { emails: string[]; ban: boolean; type: number };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { emails, ban, type }: dataType = await request.json();

        if (extendedUser?.role === 'admin') {
            let today = new Date();
            console.log(today);
            switch (type) {
                case 0:
                    today.setDate(today.getDate() + 14);
                    break;
                case 1:
                    today.setDate(today.getDate() + 30);
                    break;
                case 2:
                    today.setDate(today.getDate() + 365);
                    break;
                case 3:
                    today.setDate(today.getDate() - 1);
                    break;
            }
            console.log(today);

            const response = await mongodb()
                .db('user')
                .collection('auth')
                .updateMany({
                    filter: { email: { $in: emails } },
                    update: { $set: { status: ban, unBanDates: MongoDate(today) } },
                });

            if (response.modifiedCount >= 1) {
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
