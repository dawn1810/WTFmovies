export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { MongoDate, ObjectId, mongodb, toError, toJSON } from '~/libs/func';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { ExtendedUser } from '~/libs/interfaces';

interface dataType {
    searchName: string;
    avatar: string;
    username: string;
    content: string;
}

export async function POST(request: NextRequest) {
    const session = await auth();

    if (!session) return toError('Lỗi xác thực', 403);

    try {
        const extendedUser: ExtendedUser | undefined = session?.user;

        const { searchName, avatar, username, content }: dataType = await request.json();
        const today = new Date();

        if (content.length <= 0 || username.length <= 0) return toError('Bình luận không hợp lệ', 400);
        if (content.length > 500) return toError('Bình luận quá dài', 401);
        const result = await mongodb()
            .db('film')
            .collection('comment')
            .insertOne({
                email: extendedUser?.email,
                username: username,
                avatar: avatar,
                content: content,
                time: MongoDate(today),
                status: true,
            });

        await mongodb()
            .db('film')
            .collection('information')
            .updateOne({
                filter: { searchName: searchName },
                update: { $push: { comment: ObjectId(result.insertedId) } },
                upsert: true,
            });

        return toJSON({ content: 'Gửi bình luận thành công', commentId: result.insertedId });
    } catch (error) {
        return toError('Lỗi gửi bình luận: ' + error, 500);
    }
}
