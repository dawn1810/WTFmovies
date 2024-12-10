export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, toError, toJSON } from '~/libs/func';
import { CommentInterface, ExtendedUser, UserInfoInterface } from '~/libs/interfaces';

interface dataType {
    email: string;
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        // check route
        const extendedUser: ExtendedUser | undefined = session?.user;
        if (extendedUser?.role !== 'admin') return toError('Api không trong phạm trù quyền của bạn', 403);

        // get data
        const { email }: dataType = await request.json();

        const history: any[] = await mongodb()
            .db('user')
            .collection('information')
            .findOne({
                filter: { email },
                projection: {
                    _id: 0,
                    history: 1,
                },
            });

        return toJSON({ content: 'Lấy lịch sử thay đổi của người dùng thành công', data: history });
    } catch (error) {
        return toError('Lỗi phản hồi bình luận: ' + error, 500);
    }
}
