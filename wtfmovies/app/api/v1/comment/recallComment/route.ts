export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, ObjectId, toError, toJSON } from '~/libs/func';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { ExtendedUser } from '~/libs/interfaces';

interface dataType {
    commentId: string;
    senderEmail: string;
}

export async function POST(request: NextRequest) {
    const session = await auth();

    const extendedUser: ExtendedUser | undefined = session?.user;

    if (!session) return toError('Lỗi xác thực', 403);

    try {
        const { commentId, senderEmail }: dataType = await request.json();
        if (senderEmail !== extendedUser?.email) {
            return toError('Thu hồi tin nhắn không hợp lệ', 401);
        }

        const updateComment = await mongodb()
            .db('film')
            .collection('comment')
            .updateOne({
                filter: { _id: ObjectId(commentId), email: senderEmail },
                update: {
                    $set: { status: false },
                },
            });

        if (updateComment) return toJSON({ content: 'Thu hồi bình luận thành công' });
        else return toError('Thu hồi bình luận thất bại', 400);
    } catch (error) {
        return toError('Lỗi thu hồi bình luận: ' + error, 500);
    }
}
