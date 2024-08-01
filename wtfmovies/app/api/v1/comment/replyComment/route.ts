export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { MongoDate, mongodb, ObjectId, toError, toJSON } from '~/libs/func';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { ExtendedUser } from '~/libs/interfaces';

interface dataType {
    avatar: string;
    username: string;
    content: string;
    commentId: string;
}

export async function POST(request: NextRequest) {
    const session = await auth();

    if (!session) return toError('Lỗi xác thực', 403);

    try {
        const extendedUser: ExtendedUser | undefined = session?.user;

        const { avatar, username, content, commentId }: dataType = await request.json();
        const today = new Date();

        if (content.length <= 0 || username.length <= 0) return toError('Bình luận không hợp lệ', 400);
        if (content.length > 500) return toError('Bình luận quá dài', 401);

        const result = await mongodb()
            .db('film')
            .collection('comment')
            .insertOne({
                reply: true,
                email: extendedUser?.email,
                username: username,
                avatar: avatar,
                content: content,
                time: MongoDate(today),
                status: true,
            });

        await mongodb()
            .db('film')
            .collection('comment')
            .updateOne({
                filter: { _id: ObjectId(commentId) },
                update: {
                    $push: { replyIdList: ObjectId(result.insertedId) },
                    $inc: { replyLength: 1 },
                },
            });

        return toJSON({ content: 'Gửi bình luận thành công', commentId: result.insertedId });
    } catch (error) {
        return toError('Lỗi phản hồi bình luận: ' + error, 500);
    }
}
