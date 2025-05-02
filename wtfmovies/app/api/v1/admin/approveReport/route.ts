export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { ids: string[] };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { ids }: dataType = await request.json();

        const newIds = ids.map((id) => ObjectId(id));

        if (extendedUser?.role === 'admin') {
            const response = await mongodb()
                .db('statistical')
                .collection('report')
                .updateMany({
                    filter: { _id: { $in: newIds } },
                    update: { $set: { status: false } },
                });

            if (response) {
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
