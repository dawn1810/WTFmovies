export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { MongoDate, mongodb, toError, toJSON } from '~/libs/func';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { ExtendedUser } from '~/libs/interfaces';

interface dataType {
    receiver: string;
    avatar: string;
    username: string;
    content: string;
}

export async function POST(request: NextRequest) {
    const session = await auth();

    if (!session) return toError('Lỗi xác thực', 403);

    try {
        const extendedUser: ExtendedUser | undefined = session?.user;

        const { avatar, username, content }: dataType = await request.json();
        const today = new Date();

        if (content.length <= 0 || username.length <= 0) return toError('Bình luận không hợp lệ', 400);
        if (content.length > 500) return toError('Bình luận quá dài', 401);

        await mongodb()
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

        return toJSON('Phản hồi bình luận thành công');
    } catch (error) {
        return toError('Lỗi phản hồi bình luận: ' + error, 500);
    }
}
