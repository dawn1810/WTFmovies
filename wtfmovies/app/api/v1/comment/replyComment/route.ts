export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { MongoDate, mongodb, ObjectId, toError, toJSON } from '~/libs/func';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { CommentInterface, ExtendedUser } from '~/libs/interfaces';

interface dataType {
    username: string;
    content: string;
    commentId: string;
    tag: string;
    filmName: string;
}

export async function POST(request: NextRequest) {
    const session = await auth();

    if (!session) return toError('Lỗi xác thực', 403);

    try {
        const extendedUser: ExtendedUser | undefined = session?.user;

        const { username, content, commentId, tag, filmName }: dataType = await request.json();
        const today = new Date();

        if (content.length <= 0 || username.length <= 0) return toError('Bình luận không hợp lệ', 400);
        if (content.length > 500) return toError('Bình luận quá dài', 401);

        const newComment: any = {
            parentId: ObjectId(commentId),
            email: extendedUser?.email,
            username: username,
            content: content,
            time: MongoDate(today),
            status: true,
        };

        if (tag) {
            newComment.tag = tag;

            const addNotify = await mongodb()
                .db('user')
                .collection('notify')
                .insertOne({
                    content: `${username} vừa nhắc đến bạn trong một bình luận của ${filmName}!`,
                    time: MongoDate(today),
                    link: `http://localhost:3000/review/${filmName}`,
                });

            await mongodb()
                .db('user')
                .collection('information')
                .updateOne({
                    filter: { email: tag },
                    update: {
                        $push: { notifications: ObjectId(addNotify.insertedId) },
                    },
                });
        }

        const result = await mongodb().db('film').collection('comment').insertOne(newComment);

        await mongodb()
            .db('film')
            .collection('comment')
            .updateOne({
                filter: { _id: ObjectId(commentId) },
                update: {
                    $inc: { replyLength: 1 },
                },
            });

        return toJSON({ content: 'Gửi bình luận thành công', commentId: result.insertedId });
    } catch (error) {
        return toError('Lỗi phản hồi bình luận: ' + error, 500);
    }
}
