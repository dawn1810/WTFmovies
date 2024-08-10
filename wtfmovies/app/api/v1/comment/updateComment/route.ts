export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, ObjectId, toError, toJSON } from '~/libs/func';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { ExtendedUser } from '~/libs/interfaces';

interface dataType {
    commentId: string;
    senderEmail: string;
    newContent: string;
}

export async function POST(request: NextRequest) {
    const session = await auth();

    const extendedUser: ExtendedUser | undefined = session?.user;

    if (!session) return toError('Lỗi xác thực', 403);

    try {
        const { commentId, senderEmail, newContent }: dataType = await request.json();
        if (senderEmail !== extendedUser?.email) {
            return toError('Cập nhật bình luận không hợp lệ', 401);
        }

        const updateComment = await mongodb()
            .db('film')
            .collection('comment')
            .updateOne({
                filter: { _id: ObjectId(commentId), email: senderEmail },
                update: {
                    $set: { edit: true, content: newContent },
                },
            });

        if (updateComment) return toJSON({ content: 'Cập nhật bình luận thành công' });
        else return toError('Cập nhật bình luận thất bại', 400);
    } catch (error) {
        return toError('Lỗi thu hồi bình luận: ' + error, 500);
    }
}
